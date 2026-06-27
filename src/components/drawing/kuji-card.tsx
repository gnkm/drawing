import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Kuji } from "@/lib/drawing/kuji";
import { iconButtonClassName } from "@/ui";

type KujiCardProps = {
  kuji: Kuji;
  onRemove?: (id: string) => void;
};

export function KujiCard({ kuji, onRemove }: KujiCardProps) {
  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm",
          "dark:border-zinc-800/80 dark:bg-zinc-950/60",
        )}
      >
        <span
          aria-hidden="true"
          className="size-4 shrink-0 rounded-full ring-1 ring-zinc-900/10 dark:ring-white/10"
          style={{ backgroundColor: kuji.color }}
        />
        <p className="min-w-0 flex-1 wrap-break-word text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {kuji.label}
        </p>
        <button
          aria-label={`「${kuji.label}」を削除`}
          className={iconButtonClassName}
          onClick={() => onRemove?.(kuji.id)}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </li>
  );
}
