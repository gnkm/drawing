import { cn } from "@/lib/cn";
import type { DrawResult } from "@/lib/drawing/draw";

export function ResultItem({ result }: { result: DrawResult }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className="w-6 shrink-0 text-right text-sm font-semibold tabular-nums text-zinc-500 dark:text-zinc-400"
        translate="no"
      >
        {result.order}
      </span>
      <div
        className={cn(
          "flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200/60 bg-zinc-50/50 px-3 py-2",
          "dark:border-zinc-800/60 dark:bg-zinc-950/40",
        )}
      >
        <span
          aria-hidden="true"
          className="size-4 shrink-0 rounded-full ring-1 ring-zinc-900/10 dark:ring-white/10"
          style={{ backgroundColor: result.kuji.color }}
        />
        <span className="min-w-0 flex-1 wrap-break-word text-sm text-zinc-900 dark:text-zinc-50">
          {result.kuji.label}
        </span>
      </div>
    </li>
  );
}
