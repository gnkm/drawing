import { BoxSection } from "./box-section";
import { ControlPanel } from "./control-panel";
import { ResultsSection } from "./results-section";

export function DrawingLayout() {
  const drawResults = [
    {
      order: 1,
      kuji: {
        label: "くじ1",
        color: "hsl(30, 70%, 60%)",
      },
    },
    {
      order: 2,
      kuji: {
        label: "くじ2",
        color: "hsl(120, 70%, 60%)",
      },
    },
  ];

  const box = [
    {
      id: "3",
      label: "くじ3",
      color: "hsl(60, 70%, 60%)",
    },
    {
      id: "4",
      label: "くじ4",
      color: "hsl(240, 70%, 60%)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ControlPanel />
      <BoxSection box={box} />
      <ResultsSection results={drawResults} />
    </div>
  );
}
