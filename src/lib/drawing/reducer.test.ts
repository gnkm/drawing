import { describe, expect, it } from "vitest";
import { drawingReducer } from "./reducer";

describe("drawingReducer", () => {
  it("drawKujiで箱から対象を削除し、抽選結果を先頭に追加する", () => {
    const state = {
      box: [
        { id: "a", label: "A賞", color: "hsl(10, 70%, 60%)" },
        { id: "b", label: "B賞", color: "hsl(20, 70%, 60%)" },
      ],
      results: [
        { order: 1, kuji: { label: "旧結果", color: "hsl(30, 70%, 60%)" } },
      ],
    };

    const action = {
      type: "drawKuji" as const,
      drawnId: "a",
      results: { order: 2, kuji: { label: "A賞", color: "hsl(10, 70%, 60%)" } },
    };

    const next = drawingReducer(state, action);

    expect(next.box).toEqual([
      { id: "b", label: "B賞", color: "hsl(20, 70%, 60%)" },
    ]);
    expect(next.results).toEqual([action.results, ...state.results]);
  });
});
