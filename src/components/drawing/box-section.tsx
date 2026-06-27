import type { Kuji } from "@/lib/drawing/kuji";
import { KujiCard } from "./kuji-card";

export function BoxSection({ box }: { box: Kuji[] }) {
  return (
    <div>
      <h2>Box</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ul>
          {box.map((kuji) => (
            <KujiCard key={kuji.id} kuji={kuji} />
          ))}
        </ul>
      </div>
    </div>
  );
}
