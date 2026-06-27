import type { DrawResult } from "@/lib/drawing/draw";

export function ResultItem({ result }: { result: DrawResult }) {
  return (
    <li>
      <p className="text-sm font-medium">{result.order}</p>
      <p className="text-sm font-medium">{result.kuji.label}</p>
    </li>
  );
}
