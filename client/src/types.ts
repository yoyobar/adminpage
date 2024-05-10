//! Login.tsx 타입

export interface FormData {
  descID: number;
  title: string;
  description: string;
  type: string;
  isDone?: boolean;
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
  createTask: (form: FormData) => void;
  checkTask: (id: string) => void;
  editTask: (id: string, form: FormData) => void;
  updateTask: (task: TaskType) => Promise<void>;
}
