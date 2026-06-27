# Drawing 設計

[org.md](./org.md) の仕様に基づく React コンポーネントと state の設計。技術スタックは React 19、Tailwind CSS 4（org.md のテンプレートから TanStack Router は 1 画面のため採用しない）。

## 設計方針

- **1 画面完結**: drawing 本体を `main.tsx` から直接描画する。デモページ（counter, form 等）および TanStack Router 関連（`routes/`、`routeTree.gen.ts` 等）は実装開始時に削除する。
- **React 標準の state**: 箱・抽選結果は 1 画面内で完結するため、Zustand 等の外部ストアは使わない。`App` で `useReducer` により管理し、子コンポーネントへ props で渡す。
- **派生値は state に持たない**: ボタンの disabled 条件など、既存 state から計算できる値はレンダー中に求める。
- **副作用なし**: 抽選は即時反映。アニメーション・永続化（localStorage 等）は行わない。
- **アクセシビリティ**: [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) に従い、空状態の説明、`aria-live` による抽選結果の通知、適切な `disabled` / ラベルを付与する。

## データモデル

### Kuji（未抽選のくじ）

```ts
type Kuji = {
  id: string;   // リスト key と抽選操作の識別子（UUID 等）
  label: string; // 1〜20 文字（trim 済み）
  color: string; // `hsl(<0-360>, 70%, 60%)`
};
```

| 項目 | 説明 |
|------|------|
| `id` | React の `key` と抽選・削除操作の対象特定に使う。仕様上ユーザーに見せない。 |
| `label` | フォーム入力内容。同じ文字列の重複追加を許容する。 |
| `color` | 追加時に色相 0〜360 の整数をランダム生成して割り当てる。重複可。 |

### DrawResult（抽選結果）

```ts
type DrawResult = {
  order: number; // 引き出し順（1 始まり）
  kuji: Pick<Kuji, "label" | "color">;
};
```

抽選結果は **新しいものが上**（配列の先頭が最新）で保持する。表示時の順位番号は `order` をそのまま使う。

### 永続化

箱・抽選結果ともメモリ上のみ。ページリロードで初期化される。

## State 設計

### 責務の分担

| 状態 | 保持場所 | 理由 |
|------|----------|------|
| `box: Kuji[]` | `App` の `useReducer` | 1 画面内の複数子コンポーネントで共有。ページをまたぐ必要がない |
| `results: DrawResult[]` | 同上 | 同上 |
| `inputText: string` | `AddKujiForm` の `useState` | 追加・クリア時のみ使う UI 局所 state |
| `formResetKey: number` | `App` の `useState` | クリア時にフォームを remount するため |

Zustand を使わない理由: drawing は単一ルートの 1 画面アプリであり、state をページをまたいで共有する要件がない。`useReducer` で更新ロジックを集約すれば十分。

### Reducer

ファイル: `src/lib/drawing/reducer.ts`

```ts
type DrawingState = {
  box: Kuji[];
  results: DrawResult[];
};

type DrawingAction =
  | { type: "addKuji"; label: string }
  | { type: "removeKuji"; id: string }
  | { type: "drawKuji" }
  | { type: "clear" };

function drawingReducer(
  state: DrawingState,
  action: DrawingAction,
): DrawingState;
```

#### アクション

| アクション | 入力 | 処理 |
|------------|------|------|
| `addKuji` | `label: string` | trim 後が空または 20 文字超なら state 不変。`createKuji(label)` でくじを生成し `box` 末尾に追加。 |
| `removeKuji` | `id: string` | `box` から `id` が一致する 1 件を除去。該当なしなら state 不変。`results` は変更しない。 |
| `drawKuji` | — | `box` が空なら state 不変。均等確率で 1 件を選び `box` から除去。`order = results.length + 1` を付与し `results` の先頭に prepend。 |
| `clear` | — | `box` と `results` を空配列にリセット。 |

抽選のランダム選択は `Math.floor(Math.random() * box.length)` でインデックスを決め、配列から除去する（`filter` / `toSpliced` 等。イミュータブル更新）。

### カスタム Hook

ファイル: `src/app/hooks/use-drawing.ts`

`useReducer` をラップし、`App` から使いやすい API を返す。

```ts
function useDrawing() {
  const [state, dispatch] = useReducer(drawingReducer, initialDrawingState);

  return {
    box: state.box,
    results: state.results,
    addKuji: (label: string) => dispatch({ type: "addKuji", label }),
    removeKuji: (id: string) => dispatch({ type: "removeKuji", id }),
    drawKuji: () => dispatch({ type: "drawKuji" }),
    clear: () => dispatch({ type: "clear" }),
  };
}
```

### 派生値（レンダー中に計算）

| 派生値 | 計算式 | 用途 |
|--------|--------|------|
| `canDraw` | `box.length > 0` | 「くじを引く」の disabled |
| `canClear` | `box.length > 0 \|\| results.length > 0` | 「クリア」の disabled |

フォーム側の派生値（`AddKujiForm` 内）:

| 派生値 | 計算式 | 用途 |
|--------|--------|------|
| `trimmedInput` | `inputText.trim()` | バリデーション |
| `canAdd` | `trimmedInput.length > 0 && trimmedInput.length <= 20` | 「くじを追加」の disabled |

### 純粋関数（lib）

ドメインロジックは reducer 外の純粋関数に切り出し、テストしやすくする。

ファイル: `src/lib/drawing/kuji.ts`

```ts
function createKuji(label: string): Kuji;
function isValidKujiInput(input: string): boolean; // trim 後 1〜20 文字
function randomHue(): number; // 0〜360 の整数
function toHslColor(hue: number): string; // `hsl(hue, 70%, 60%)`
```

ファイル: `src/lib/drawing/draw.ts`

```ts
function pickRandomIndex(length: number): number; // 0 <= i < length
function createDrawResult(kuji: Kuji, order: number): DrawResult;
```

## コンポーネント設計

### ツリー

```text
App                    # useDrawing + formResetKey。state の起点
└── AppShell                   # 既存。全画面背景
    └── DrawingLayout          # BoxSection・ResultsSection・ControlPanel を grid で配置
        ├── BoxSection           # props: box, onRemoveKuji
        │   ├── BoxEmptyState
        │   └── ul > KujiCard × n  # 各カードに削除操作
        ├── ResultsSection       # props: results
        │   ├── ResultsEmptyState
        │   └── ol > ResultItem × n
        └── ControlPanel         # props: handlers, disabled 条件, formResetKey
            ├── AddKujiForm      # props: onAdd, resetKey
            ├── DrawButton       # props: onDraw, disabled
            └── ClearButton      # props: onClear, disabled
```

### 各コンポーネントの責務

| コンポーネント | ファイル | 責務 |
|----------------|----------|------|
| `App` | `src/app/app.tsx` | `useDrawing` で state を保持。子へ props を配る。`clear` 時に `formResetKey` を更新。 |
| `DrawingLayout` | `src/app/components/drawing/drawing-layout.tsx` | `BoxSection`・`ResultsSection`・`ControlPanel` を grid で配置するだけ（state を持たない）。配置は CSS で制御し、コンポーネント名に位置を含めない。 |
| `BoxSection` | `src/app/components/drawing/box-section.tsx` | props: `box`, `onRemoveKuji`。空状態または `KujiCard` リストを表示。 |
| `KujiCard` | `src/app/components/drawing/kuji-card.tsx` | 単一くじの表示と削除操作。props: `kuji: Kuji`, `onRemove: (id: string) => void`。削除ボタンに `` aria-label={`「${kuji.label}」を削除`} `` を付与。 |
| `ResultsSection` | `src/app/components/drawing/results-section.tsx` | props: `results`。`aria-live="polite"` で抽選の更新を通知。 |
| `ResultItem` | `src/app/components/drawing/result-item.tsx` | 順位番号・内容・色を表示。props: `result: DrawResult`。 |
| `ControlPanel` | `src/app/components/drawing/control-panel.tsx` | フォームと操作ボタンを縦に配置。handlers と disabled 条件を子へ渡す。 |
| `AddKujiForm` | `src/app/components/drawing/add-kuji-form.tsx` | ローカル `inputText` state。props: `onAdd`, `resetKey`。追加成功時に入力クリア。 |
| `DrawButton` | `src/app/components/drawing/draw-button.tsx` | props: `onDraw`, `disabled`。 |
| `ClearButton` | `src/app/components/drawing/clear-button.tsx` | props: `onClear`, `disabled`。 |

空状態コンポーネント（`BoxEmptyState`, `ResultsEmptyState`）は対応する Section 内に co-locate しても、独立ファイルにしてもよい。

### レイアウト（org.md 準拠）

デスクトップでは org.md のとおり、箱と抽選結果を縦に並べた領域と操作パネルを横に並べる。コンポーネント名は領域の役割（`BoxSection` 等）で表し、画面上の位置は `DrawingLayout` の CSS に委ねる。

```text
┌─────────────────────────────┬──────────┐
│ BoxSection（上）             │          │
│                             │ Control  │
│                             │ Panel    │
├─────────────────────────────┤          │
│ ResultsSection（下）         │          │
└─────────────────────────────┴──────────┘
```

- モバイル: 1 カラムにスタックしてもよい（例: `ControlPanel` を上に配置）。`md:` 以上で 2 カラムに切り替える想定。
- 抽選結果リストは **先頭が最新**（`results.map` をそのまま描画）。

### Props の方針

- **リフトアップ**: `box` / `results` と操作ハンドラは `App` が保持し、必要な子へ props で渡す。
- **表示コンポーネント**（`ResultItem`, `ResultsSection`）はデータを props のみで受け取り、更新しない。
- **操作を含むコンポーネント**（`KujiCard`, `AddKujiForm`, `DrawButton`, `ClearButton`）はコールバック props で親に通知する。`BoxSection` は `onRemoveKuji` を `KujiCard` へ渡すだけ。
- ツリーが浅いため Context は導入しない。将来ページが分割され prop drilling が問題になった場合にのみ検討する。

### クリア時のフォームリセット

`App` が `formResetKey` を `useState` で保持する。

1. `ClearButton` の `onClear` で `clear()` を dispatch
2. 続けて `setFormResetKey(k => k + 1)`
3. `AddKujiForm` に `key={formResetKey}` を渡して remount し、入力を空に戻す

## エントリポイント

1 画面のみのためルーティングライブラリは使わない。`src/main.tsx` が `App` を直接描画する。

```tsx
import { App } from "@/app/app";

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
```

`pages/` や `routes/` ディレクトリは設けない。

## ディレクトリ構成（追加・変更）

```text
src/
├── main.tsx               # App を描画
├── app/
│   ├── app.tsx            # アプリ本体（state の起点）
│   ├── components/
│   │   └── drawing/
│   │       ├── drawing-layout.tsx
│   │       ├── box-section.tsx
│   │       ├── kuji-card.tsx
│   │       ├── results-section.tsx
│   │       ├── result-item.tsx
│   │       ├── control-panel.tsx
│   │       ├── add-kuji-form.tsx
│   │       ├── draw-button.tsx
│   │       └── clear-button.tsx
│   └── hooks/
│       └── use-drawing.ts
└── lib/
    └── drawing/
        ├── kuji.ts
        ├── draw.ts
        └── reducer.ts
```

既存の `@/app/ui`（`buttonClassName`, `inputClassName`, `cardClassName` 等）を UI スタイルの共通源として再利用する。

## 操作フローと state 遷移

```text
[初期]
  box=[], results=[], inputText="", formResetKey=0

[くじを追加]
  AddKujiForm: canAdd が true のとき onAdd(trimmedInput)
  → dispatch addKuji
  → box に Kuji 追加
  → inputText=""（ローカル）

[くじを削除]
  KujiCard: onRemove(id)
  → dispatch removeKuji
  → box から該当 id の 1 件を除去（results は不変）

[くじを引く]
  canDraw が true のとき drawKuji()
  → box から 1 件除去
  → results 先頭に DrawResult { order, kuji } を追加

[クリア]
  canClear が true のとき clear()
  → box=[], results=[]
  → formResetKey を increment → AddKujiForm が remount
```

## テスト方針（参考）

| 対象 | 内容 |
|------|------|
| `lib/drawing/*` | `createKuji`, `isValidKujiInput`, `pickRandomIndex` の単体テスト |
| `drawingReducer` | add / remove / draw / clear の state 遷移。空箱での draw、存在しない id の remove は no-op |
| コンポーネント | Testing Library で追加→削除→抽選→結果表示→クリアの操作フロー |

抽選のランダム性は `pickRandomIndex` をモックするか、固定 seed で lib 層を検証する。

## 実装時の注意

- **React Compiler** 有効環境のため、不要な `useMemo` / `useCallback` は先回りして入れない。
- 同内容くじの重複は `id` で区別する。表示は `label` のみ。
- 抽選結果の `order` は引き出し順の通し番号。クリア後は 1 から再開。
