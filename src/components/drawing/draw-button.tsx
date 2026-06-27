import { cn } from "@/lib/cn";
import { buttonClassName } from "@/ui";

type DrawButtonProps = {
  className?: string;
  disabled?: boolean;
  onDraw: () => void;
};

export function DrawButton({
  className,
  disabled = false,
  onDraw,
}: DrawButtonProps) {
  return (
    <button
      className={cn(buttonClassName, className)}
      disabled={disabled}
      onClick={onDraw}
      type="button"
    >
      くじを引く
    </button>
  );
}
