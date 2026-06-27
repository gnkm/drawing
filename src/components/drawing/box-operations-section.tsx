import type { Kuji } from "@/lib/drawing/kuji";
import {
  cardClassName,
  emptyStateClassName,
  sectionTitleClassName,
} from "@/ui";
import { ClearButton } from "./clear-button";
import { DrawButton } from "./draw-button";
import { KujiCard } from "./kuji-card";

type BoxOperationsSectionProps = {
  box: Kuji[];
  onRemoveKuji?: (id: string) => void;
};

export function BoxOperationsSection({
  box,
  onRemoveKuji,
}: BoxOperationsSectionProps) {
  return (
    <section aria-labelledby="box-operations-heading" className={cardClassName}>
      <h2 className={sectionTitleClassName} id="box-operations-heading">
        くじ操作
      </h2>
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <DrawButton className="w-full" />
          <ClearButton className="w-full" />
        </div>
        {box.length === 0 ? (
          <p className={emptyStateClassName}>
            くじがまだありません。左のフォームから追加してください。
          </p>
        ) : (
          <ul className="flex list-none flex-col gap-2 p-0">
            {box.map((kuji) => (
              <KujiCard key={kuji.id} kuji={kuji} onRemove={onRemoveKuji} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
