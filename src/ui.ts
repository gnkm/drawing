import { cn } from "@/lib/cn";

export const buttonClassName = cn(
  "inline-flex touch-manipulation items-center justify-center rounded-lg px-4 py-2 text-sm font-medium",
  "bg-zinc-900 text-white shadow-sm",
  "transition-colors duration-150 hover:bg-zinc-800 active:bg-zinc-950",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50",
  "disabled:pointer-events-none disabled:opacity-50",
  "dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200",
  "dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950",
);

export const secondaryButtonClassName = cn(
  "inline-flex touch-manipulation items-center justify-center rounded-lg px-4 py-2 text-sm font-medium",
  "border border-zinc-200 bg-white text-zinc-900 shadow-sm",
  "transition-colors duration-150 hover:bg-zinc-50 active:bg-zinc-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50",
  "disabled:pointer-events-none disabled:opacity-50",
  "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
  "dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950",
);

export const iconButtonClassName = cn(
  "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg p-2",
  "text-zinc-500 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-700",
  "dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900",
);

export const inputClassName = cn(
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm",
  "transition-[color,box-shadow,border-color] duration-150 placeholder:text-zinc-400",
  "focus-visible:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15",
  "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
  "dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-100/15",
);

export const cardClassName = cn(
  "rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm",
  "dark:border-zinc-800/80 dark:bg-zinc-900/70",
);

export const sectionTitleClassName = cn(
  "text-balance text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50",
);

export const hintClassName = cn(
  "rounded-lg border border-zinc-200/80 bg-zinc-50 px-3 py-2 text-pretty text-sm leading-relaxed text-zinc-600",
  "dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400",
);

export const emptyStateClassName = cn(
  "rounded-lg border border-dashed border-zinc-200/80 bg-zinc-50/80 px-4 py-8 text-center text-pretty text-sm leading-relaxed text-zinc-500",
  "dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400",
);
