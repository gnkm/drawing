import { cardClassName, sectionTitleClassName } from "@/ui";
import { AddKujiForm } from "./add-kuji-form";

type AddKujiSectionProps = {
  onAdd: (label: string) => void;
  resetKey: number;
};

export function AddKujiSection({ onAdd, resetKey }: AddKujiSectionProps) {
  return (
    <section aria-labelledby="add-kuji-heading" className={cardClassName}>
      <h2 className={sectionTitleClassName} id="add-kuji-heading">
        くじを追加
      </h2>
      <div className="mt-4">
        <AddKujiForm key={resetKey} onAdd={onAdd} />
      </div>
    </section>
  );
}
