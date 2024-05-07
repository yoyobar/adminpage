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

interface NewType {
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface StoreType {
  task:
    | null
    | {
        descID: number;
        title: string;
        description: string;
        type: string;
      }[];
  filteredTask:
    | null
    | {
        descID: number;
        title: string;
        description: string;
        type: string;
      }[];
  loadTask: () => Promise<void>;
  cleanTask: () => void;
  viewTask: (task: string) => void;
}

interface TaskItemType {
  descID: number;
  title: string;
  description: string;
  type: string;
  stat?: boolean;
}

interface NavItemType {
  type: string;
  count: number;
  stat: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface CountDataItemType {
  type: string;
  count: number;
  stat: boolean;
}

export type { ButtonType, InputType, LoginType, AdminLoginType, TokenType, SearchType, NewType, StoreType, TaskItemType, CountDataItemType, NavItemType };
