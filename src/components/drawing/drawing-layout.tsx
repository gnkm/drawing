import { AddKujiSection } from "./add-kuji-section";
import { BoxOperationsSection } from "./box-operations-section";
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
    <div className="drawing-layout">
      <div className="drawing-layout__add">
        <AddKujiSection />
      </div>
      <div className="drawing-layout__operations">
        <BoxOperationsSection box={box} />
      </div>
      <div className="drawing-layout__results">
        <ResultsSection results={drawResults} />
      </div>
    </div>
  );
}
