export interface ITab {
  id: string;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  invisible?: boolean;
}

export type TTabsPosition = "left" | "center" | "right";
