export interface ButtonType {
  text: string;
  color: "indigo" | "green" | "red" | "gray";
  type: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  name?: string;
}

export interface InputType {
  text: string;
  type: string;
  name?: string;
  value?: string;
  require?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface LoginType {
  email: string;
  name: string;
  exp: string;
}
export interface AdminLoginType {
  email: string;
  password: string;
  key: string;
}

export interface TokenType {
  expire: number;
  token: object;
}

export interface SearchType {
  logout: () => void;
}

export interface NewType {
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormData {
  title: string;
  description: string;
  isDone: boolean;
  type: string;
}
export interface StoreType {
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
  view: string;
  loadTask: () => Promise<void>;
  cleanTask: () => void;
  viewTask: (task: string) => void;
  deleteTask: (id: string) => void;
  createTask: (form: FormData) => void;
}

export interface TaskItemType {
  descID: number;
  title: string;
  description: string;
  type: string;
  stat?: boolean;
}

export interface NavItemType {
  type: string;
  count: number;
  stat: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CountDataItemType {
  type: string;
  count: number;
  stat: boolean;
}
