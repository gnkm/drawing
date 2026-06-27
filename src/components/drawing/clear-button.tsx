import { cn } from "@/lib/cn";
import { secondaryButtonClassName } from "@/ui";

type ClearButtonProps = {
  className?: string;
  disabled?: boolean;
  onClear?: () => void;
};

export function ClearButton({
  className,
  disabled = false,
  onClear,
}: ClearButtonProps) {
  return (
    <button
      className={cn(secondaryButtonClassName, className)}
      disabled={disabled}
      onClick={onClear}
      type="button"
    >
      リセット
    </button>
  );
}
