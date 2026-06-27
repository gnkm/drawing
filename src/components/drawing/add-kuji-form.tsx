import { useState } from "react";
import { buttonClassName, inputClassName } from "@/ui";

const MAX_LENGTH = 20;

export function AddKujiForm({ onAdd }: { onAdd: (label: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const trimmed = inputValue.trim();
  const isEmpty = trimmed.length === 0;
  const isTooLong = trimmed.length > MAX_LENGTH;
  const canSubmit = !isEmpty && !isTooLong;

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onAdd(trimmed);
        setInputValue("");
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
          maxLength={MAX_LENGTH}
          name="kuji-label"
          placeholder="ラベルを入力…"
          spellCheck={true}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          1〜{MAX_LENGTH} 文字
        </p>
      </div>
      <div className="flex justify-center">
        <button className={buttonClassName} disabled={!canSubmit} type="submit">
          くじを追加
        </button>
      </div>
    </form>
  );
}
