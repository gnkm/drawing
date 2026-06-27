import type { DrawResult } from "./draw";
import type { Kuji } from "./kuji";

type DrawingState = {
  box: Kuji[];
  results: DrawResult[];
};

type DrawingAction =
  | { type: "addKuji"; label: string }
  | { type: "removeKuji"; id: string }
  | { type: "drawKuji" }
  | { type: "clear" };

function createKuji(label: string): Kuji {
  return {
    id: crypto.randomUUID(),
    label,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
  };
}

function createDrawResult(results: DrawResult[], kuji: Kuji): DrawResult {
  return {
    order: results.length + 1,
    kuji: { label: kuji.label, color: kuji.color },
  };
}

export function drawingReducer(
  state: DrawingState,
  action: DrawingAction,
): DrawingState {
  switch (action.type) {
    case "addKuji":
      return { ...state, box: [...state.box, createKuji(action.label)] };
    case "removeKuji":
      return {
        ...state,
        box: state.box.filter((kuji) => kuji.id !== action.id),
      };
    case "drawKuji": {
      if (state.box.length === 0) {
        return state;
      }
      const index = Math.floor(Math.random() * state.box.length);
      const drawn = state.box[index];
      if (!drawn) {
        return state;
      }
      return {
        ...state,
        box: state.box.filter((kuji) => kuji.id !== drawn.id),
        results: [createDrawResult(state.results, drawn), ...state.results],
      };
    }
    case "clear":
      return { ...state, box: [], results: [] };
    default:
      return state;
  }
}
