import type { Kuji } from "./kuji";

export type DrawResult = {
  order: number;
  kuji: Pick<Kuji, "label" | "color">;
};
