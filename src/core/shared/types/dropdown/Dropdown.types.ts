import type { RouteLocationRaw } from "vue-router";

export interface IDropdownItem {
  label: string;
  route?: RouteLocationRaw;
  cssClasses?: string;
  dataTestId?: string;

  fn?(): void;
}

export type TPlacementsOptions =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end";
