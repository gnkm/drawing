import type { DrawResult } from "./draw";
import type { Kuji } from "./kuji";

type DrawingState = {
  box: Kuji[];
  results: DrawResult[];
};

type DrawingAction =
  | { type: "addKuji"; kuji: Kuji }
  | { type: "removeKuji"; id: string }
  | { type: "drawKuji"; drawnId: string; results: DrawResult }
  | { type: "clear" };

export function drawingReducer(
  state: DrawingState,
  action: DrawingAction,
): DrawingState {
  switch (action.type) {
    case "addKuji":
      return { ...state, box: [...state.box, action.kuji] };
    case "removeKuji":
      return {
        ...state,
        box: state.box.filter((kuji) => kuji.id !== action.id),
      };
    case "drawKuji":
      return {
        ...state,
        box: state.box.filter((kuji) => kuji.id !== action.drawnId),
        results: [action.results, ...state.results],
      };
    case "clear":
      return { ...state, box: [], results: [] };
    default:
      return state;
  }
}
