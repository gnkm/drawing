import type { DrawResult } from "@/lib/drawing/draw";
import {
  cardClassName,
  emptyStateClassName,
  sectionTitleClassName,
} from "@/ui";
import { ResultItem } from "./result-item";

export function ResultsSection({ results }: { results: DrawResult[] }) {
  return (
    <section
      aria-labelledby="results-heading"
      className={cardClassName}
      aria-live="polite"
    >
      <h2 className={sectionTitleClassName} id="results-heading">
        抽選結果
      </h2>
      {results.length === 0 ? (
        <p className={emptyStateClassName}>
          まだ抽選結果はありません。くじを引くとここに表示されます。
        </p>
      ) : (
        <ol className="mt-4 flex list-none flex-col gap-2 p-0">
          {results.map((result) => (
            <ResultItem key={result.order} result={result} />
          ))}
        </ol>
      )}
    </section>
  );
}
