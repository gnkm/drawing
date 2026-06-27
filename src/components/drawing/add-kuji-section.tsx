import { cardClassName, sectionTitleClassName } from "@/ui";
import { AddKujiForm } from "./add-kuji-form";

export function AddKujiSection() {
  return (
    <section aria-labelledby="add-kuji-heading" className={cardClassName}>
      <h2 className={sectionTitleClassName} id="add-kuji-heading">
        くじを追加
      </h2>
      <div className="mt-4">
        <AddKujiForm />
      </div>
    </section>
  );
}
