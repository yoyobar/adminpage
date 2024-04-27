import react from "react";

interface ButtonType {
  text: string;
  type: "indigo" | "green" | "red" | "gray";
  onClick?: react.MouseEventHandler<HTMLButtonElement>;
}

interface InputType {
  text: string;
  type: string;
  require?: boolean;
  onChange?: react.ChangeEventHandler<HTMLInputElement>;
}

interface RegisterPropsType {
  registerModalClose: () => void;
}

export type { ButtonType, InputType, RegisterPropsType };
