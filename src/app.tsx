import { AppShell } from "@/components/app-shell";
import { DrawingLayout } from "@/components/drawing/drawing-layout";

export function App() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl p-6">
        <h1 className="text-2xl font-bold">Drawing</h1>
        <DrawingLayout />
      </main>
    </AppShell>
  );
}
