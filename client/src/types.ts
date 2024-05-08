//! UI (Button.tsx, Input.tsx)
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

//! Login.tsx 타입
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

//! getToken.ts 타입
export interface TokenType {
  expire: number;
  token: object;
}

export interface SearchType {
  logout: () => void;
}

export interface NewType {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visibleHandler: () => void;
}

//! New.tsx 타입

interface FormData {
  title: string;
  description: string;
  type: string;
}
export interface FormDataCheck extends FormData {
  isDone: boolean;
}

//! Store.tsx 타입
export interface StoreType {
  task:
    | null
    | {
        descID: number;
        title: string;
        description: string;
        type: string;
        stat: number;
        isDone: boolean;
      }[];

  filteredTask:
    | null
    | {
        descID: number;
        title: string;
        description: string;
        type: string;
        stat: number;
        isDone: boolean;
      }[];
  view: string;
  loadTask: () => Promise<void>;
  cleanTask: () => void;
  viewTask: (task: string) => void;
  deleteTask: (id: string) => void;
  createTask: (form: FormDataCheck) => void;
  checkTask: (id: string) => void;
  editTask: (id: string, form: FormData) => void;
}

//! Store.tsx / TaskItem.tsx 타입
export interface TaskItemType {
  descID: number;
  title: string;
  description: string;
  type: string;
  stat: number;
  isDone: boolean;
  editorExitHandler: () => void;
  editorHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
//! Store.tsx / Nav.tsx 타입
export interface CountDataItemType {
  type: string;
  count: number;
  stat: boolean;
}

export interface NavItemType extends CountDataItemType {
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
