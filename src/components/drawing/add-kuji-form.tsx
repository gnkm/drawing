import { buttonClassName, inputClassName } from "@/ui";

export function AddKujiForm({ onAdd }: { onAdd: (label: string) => void }) {
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const label = formData.get("kuji-label") as string;
        onAdd(label);
        event.target.reset();
      }}
    >
      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          htmlFor="kuji-label"
        >
          くじの内容
        </label>
        <input
          autoComplete="off"
          className={inputClassName}
          id="kuji-label"
          maxLength={20}
          name="kuji-label"
          placeholder="ラベルを入力…"
          spellCheck={true}
          type="text"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">1〜20 文字</p>
      </div>
      <div className="flex justify-center">
        <button className={buttonClassName} type="submit">
          くじを追加
        </button>
      </div>
    </form>
  );
}
