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

  const onAdd = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    dispatch({
      type: "addKuji",
      kuji: {
        id: crypto.randomUUID(),
        label: trimmed,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
      },
    });
  };

  const onDraw = () => {
    if (box.length === 0) return;
    const index = Math.floor(Math.random() * box.length);
    const drawn = box[index];
    if (!drawn) return;

    dispatch({
      type: "drawKuji",
      drawnId: drawn.id,
      results: {
        order: drawResults.length + 1,
        kuji: { label: drawn.label, color: drawn.color },
      },
    });
  };

  return (
    <div className="drawing-layout">
      <div className="drawing-layout__add">
        <AddKujiSection onAdd={onAdd} />
      </div>
      <div className="drawing-layout__operations">
        <BoxOperationsSection
          box={box}
          onRemove={(id: string) => dispatch({ type: "removeKuji", id })}
          onDraw={onDraw}
          onClear={() => dispatch({ type: "clear" })}
        />
      </div>
      <div className="drawing-layout__results">
        <ResultsSection results={drawResults} />
      </div>
    </div>
  );
}
