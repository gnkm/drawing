import { AppShell } from "@/components/app-shell";
import { DrawingLayout } from "@/components/drawing/drawing-layout";

export function App() {
  return (
    <AppShell>
      <main
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
        id="drawing-main"
      >
        <header className="mb-6 space-y-1">
          <div className="flex items-center gap-3">
            <img
              alt=""
              className="h-10 w-auto shrink-0"
              decoding="async"
              height={280}
              src="/drawing.webp"
              width={500}
            />
            <h1
              className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              translate="no"
            >
              Drawing
            </h1>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            くじを追加して抽選。結果は上から新しい順に表示されます。
          </p>
        </header>
        <DrawingLayout />
      </main>
    </AppShell>
  );
}
