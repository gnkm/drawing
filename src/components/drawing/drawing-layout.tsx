import { useReducer } from "react";
import { drawingReducer } from "@/lib/drawing/reducer";

import { AddKujiSection } from "./add-kuji-section";
import { BoxOperationsSection } from "./box-operations-section";
import { ResultsSection } from "./results-section";

export function DrawingLayout() {
  const [state, dispatch] = useReducer(drawingReducer, {
    box: [],
    results: [],
  });
  const drawResults = state.results;
  const box = state.box;

  return (
    <div className="drawing-layout">
      <div className="drawing-layout__add">
        <AddKujiSection
          onAdd={(label: string) => dispatch({ type: "addKuji", label })}
        />
      </div>
      <div className="drawing-layout__operations">
        <BoxOperationsSection
          box={box}
          onRemove={(id: string) => dispatch({ type: "removeKuji", id })}
          onDraw={() => dispatch({ type: "drawKuji" })}
          onClear={() => dispatch({ type: "clear" })}
        />
      </div>
      <div className="drawing-layout__results">
        <ResultsSection results={drawResults} />
      </div>
    </div>
  );
}
