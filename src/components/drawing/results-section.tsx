import type { DrawResult } from "@/lib/drawing/draw";
import { ResultItem } from "./result-item";

export function ResultsSection({ results }: { results: DrawResult[] }) {
  return (
    <div>
      <h2>Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ul>
          {results.map((result) => (
            <ResultItem key={result.order} result={result} />
          ))}
        </ul>
      </div>
    </div>
  );
}
