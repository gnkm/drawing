import { AppShell } from "@/components/app-shell";
import { DrawingLayout } from "@/components/drawing/drawing-layout";

export function App() {
  return (
    <AppShell>
      <a className="skip-link" href="#drawing-main">
        メインコンテンツへスキップ
      </a>
      <main
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
        id="drawing-main"
      >
        <header className="mb-6 space-y-1">
          <h1
            className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            translate="no"
          >
            Drawing
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            くじを追加して抽選。結果は上から新しい順に表示されます。
          </p>
        </header>
        <DrawingLayout />
      </main>
    </AppShell>
  );
}
