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

export interface NewType {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visibleHandler: () => void;
}

interface FormData {
  title: string;
  description: string;
  type: string;
}
export interface FormDataCheck extends FormData {
  isDone: boolean;
}

//! Store.tsx / TaskItem.tsx 타입
export interface TaskType {
  title: string;
  description: string;
  type: string;
  descID: number;
  stat: number;
  isDone: boolean;
}
export interface TaskItemType extends TaskType {
  editorExitHandler: () => void;
  editorHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
//! Store.tsx / Nav.tsx 타입

export interface NavType {
  type: string;
  count: number;
  stat: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

//! Store.tsx 타입
export interface StoreType {
  task: null | TaskType[];

  filteredTask: null | TaskType[];
  view: string;
  loadTask: () => Promise<void>;
  cleanTask: () => void;
  viewTask: (task: string) => void;
  deleteTask: (id: string) => void;
  createTask: (form: FormDataCheck) => void;
  checkTask: (id: string) => void;
  editTask: (id: string, form: FormData) => void;
  updateTask: (task: TaskType) => Promise<void>;
}
