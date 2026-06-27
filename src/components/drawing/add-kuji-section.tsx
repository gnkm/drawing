import { cardClassName, sectionTitleClassName } from "@/ui";
import { AddKujiForm } from "./add-kuji-form";

export function AddKujiSection({ onAdd }: { onAdd: (label: string) => void }) {
  return (
    <section aria-labelledby="add-kuji-heading" className={cardClassName}>
      <h2 className={sectionTitleClassName} id="add-kuji-heading">
        くじを追加
      </h2>
      <div className="mt-4">
        <AddKujiForm onAdd={onAdd} />
      </div>
    </section>
  );
}
