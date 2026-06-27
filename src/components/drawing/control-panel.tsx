import { AddKujiForm } from "./add-kuji-form";
import { ClearButton } from "./clear-button";
import { DrawButton } from "./draw-button";

export function ControlPanel() {
  return (
    <div className="flex flex-col gap-4">
      <AddKujiForm />
      <DrawButton />
      <ClearButton />
    </div>
  );
}
