interface ButtonType {
  text: string;
  color: "indigo" | "green" | "red" | "gray";
  type: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface InputType {
  text: string;
  type: string;
  name?: string;
  value?: string;
  require?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface LoginType {
  email: string;
  name: string;
  exp: string;
}
interface AdminLoginType {
  email: string;
  password: string;
  key: string;
}

interface TokenType {
  expire: number;
  token: object;
}

export type { ButtonType, InputType, LoginType, AdminLoginType, TokenType };
