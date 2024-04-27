import react from "react";

interface ButtonType {
  text: string;
  color: "indigo" | "green" | "red" | "gray";
  type: "submit" | "button";
  onClick?: react.MouseEventHandler<HTMLButtonElement>;
}

interface InputType {
  text: string;
  type: string;
  value?: string;
  require?: boolean;
  onChange?: react.ChangeEventHandler<HTMLInputElement>;
}

interface RegisterPropsType {
  registerModalClose: () => void;
}

export type { ButtonType, InputType, RegisterPropsType };
