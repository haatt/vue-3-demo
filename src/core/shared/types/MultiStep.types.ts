export interface IStep {
  id: string;
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  invisible?: boolean;
}

export type TStepsPosition = "left" | "center" | "right";
