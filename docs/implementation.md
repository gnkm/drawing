# 実装手順

[org.md](./org.md) の仕様と [architecture.md](./architecture.md) の設計に沿って drawing を実装する手順。[React の流儀](https://ja.react.dev/learn/thinking-in-react)（5 ステップ）に沿い、**静的 UI を先に作ってから state を接続する**。

## 0. 前提

```bash
pnpm install
pnpm run dev
```

仕様・設計の詳細は各ドキュメントを参照する。

## 1. テンプレートの整理

不要なデモとルーティングを削除し、1 画面構成の土台にする。

- [x] 削除: `src/routes/`、`src/routeTree.gen.ts`
- [x] 削除: `src/app/pages/`（counter, form, home 等）
- [x] 削除: `src/stores/counter-store.ts`
- [x] 削除: ルーター・Zustand 関連のテスト（`src/test/router.test.tsx` 等）
- [x] 削除: MSW 関連（`src/test/msw/`、`msw` 依存）
- [x] `vite.config.ts` から `@tanstack/router-plugin` を外す
- [x] `package.json` から未使用依存（`@tanstack/react-router`、`zustand` 等）を外す
- [x] `src/main.tsx` を `App` 直描画に差し替える（architecture.md のエントリポイント参照）

## 2. 型の定義（ステップ 1 の補助）

UI 分割と props 設計のために、データモデルの型だけ先に置く。ロジックはまだ書かない。

- [ ] `src/lib/drawing/kuji.ts` — 型 `Kuji` を export
- [ ] `src/lib/drawing/draw.ts` — 型 `DrawResult` を export

コンポーネント階層は architecture.md のツリーを参照する。

## 3. 静的 UI（ステップ 2）

**state を使わず**、props とモックデータだけで画面を組み立てる。イベントハンドラは `() => {}` や固定値でよい。

| 順 | ファイル | 内容 |
|----|----------|------|
| 1 | `result-item.tsx` | `result` を表示 |
| 2 | `results-section.tsx` | 空状態 + モック `results` |
| 3 | `kuji-card.tsx` | `kuji` を表示。削除ボタンは配置のみ |
| 4 | `box-section.tsx` | 空状態 + モック `box` |
| 5 | `add-kuji-form.tsx` | 見た目のみ（まだ controlled にしない） |
| 6 | `draw-button.tsx` / `clear-button.tsx` | 見た目 + `disabled` を props で受け取る |
| 7 | `control-panel.tsx` | 5〜6 を配置 |
| 8 | `drawing-layout.tsx` | org.md のレイアウト（`md:` で 2 カラム） |
| 9 | `app.tsx` | モックの `box` / `results` を定数で渡し、レイアウト全体を表示 |

- [ ] ブラウザでレイアウト・空状態・カード表示を確認する
- [ ] スタイルは `@/app/ui` を再利用する

この段階で props の形とコンポーネント分割が固まる。ここまでが React の流儀ステップ 1〜2。

## 4. state の設計確認（ステップ 3〜4）

静的 UI を見ながら、architecture.md の state 分担を再確認する。

- [ ] `box` / `results` → `App` の `useReducer`
- [ ] `inputText` → `AddKujiForm` の `useState`
- [ ] `formResetKey` → `App` の `useState`
- [ ] `canDraw` / `canClear` / `canAdd` → 派生値（state にしない）

## 5. ドメイン層と Hook（ステップ 5 の準備）

UI で必要な操作が確定してから、ロジックを実装する。

- [ ] `src/lib/drawing/kuji.ts` — `createKuji`, `isValidKujiInput`, `randomHue`, `toHslColor`
- [ ] `src/lib/drawing/draw.ts` — `pickRandomIndex`, `createDrawResult`
- [ ] `src/lib/drawing/reducer.ts` — `drawingReducer`（add / remove / draw / clear）
- [ ] 単体テスト: `kuji.test.ts`, `draw.test.ts`, `reducer.test.ts`
- [ ] `src/app/hooks/use-drawing.ts` — reducer をラップ

## 6. インタラクションの接続（ステップ 5）

静的 UI に state とコールバックを接続する（逆方向データフロー）。

- [ ] `app.tsx` — モックデータを `useDrawing()` に差し替え。`formResetKey` を追加
- [ ] `add-kuji-form.tsx` — controlled input に変更。`onAdd` / `resetKey` を接続
- [ ] `kuji-card.tsx` — `onRemove` を接続
- [ ] `draw-button.tsx` / `clear-button.tsx` — `onDraw` / `onClear` と `disabled` を接続
- [ ] クリア時: `clear()` → `formResetKey` を increment

## 7. 動作確認

ブラウザで org.md の操作フローを手動確認する。

- [ ] くじを追加できる（空・空白のみ・21 文字以上は不可）
- [ ] 追加後に入力がクリアされる
- [ ] 同じ内容のくじを複数追加できる
- [ ] カードから 1 件だけ削除できる（履歴は残る）
- [ ] くじを引ける（箱が空のとき disabled）
- [ ] 結果が上に追加され、順位番号が正しい
- [ ] クリアで箱・履歴・フォームがリセットされる
- [ ] リロードで state が消える

## 8. コンポーネントテスト

- [ ] `src/app/app.test.tsx`（または主要コンポーネントのテスト）
  - 追加 → 削除 → 抽選 → クリアの一連フロー

## 9. 仕上げ

- [ ] `pnpm run lint`
- [ ] `pnpm run test`
- [ ] `pnpm run build`
- [ ] README を drawing 向けに更新（任意）

## 進め方のヒント

- **静的 UI → state 接続**の順が React 公式の推奨。見た目と props を先に固めると、state の置き場所と reducer の action が自然に決まる。
- 型だけ先に置くのは、静的 UI の props 設計を助けるための最小限の準備。
- lib / reducer のテストは、UI 接続前（ステップ 5）に書くと安全。
- 派生値（`canDraw`, `canAdd` 等）は state に持たず、レンダー中に計算する（architecture.md 参照）。
- 不要な `useMemo` / `useCallback` は入れない（React Compiler 有効）。

## React の流儀との対応

| 手順 | React の流儀 |
|------|-------------|
| 2 + architecture.md ツリー | ステップ 1: UI をコンポーネント階層に分割 |
| 3 | ステップ 2: 静的バージョンを先に作る |
| 4 | ステップ 3〜4: 最小 state と保持場所 |
| 5〜6 | ステップ 5: 逆方向データフロー |
