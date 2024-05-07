interface ButtonType {
  text: string;
  color: "indigo" | "green" | "red" | "gray";
  type: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
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

interface SearchType {
  logout: () => void;
}

interface NavType {
  active: boolean;
  name: string;
  count: number;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { ButtonType, InputType, LoginType, AdminLoginType, TokenType, SearchType, NavType };
