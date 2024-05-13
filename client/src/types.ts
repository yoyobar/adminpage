//! Login.tsx 타입

/** @enum CRUD 요청 관리 */
export enum CRUD {
  /** @type {0} */
  CREATE = "CREATE",
  /** @type {1} */
  UPDATE = "UPDATE",
  /** @type {2} */
  CHECK = "CHECK",
  /** @type {3} */
  DELETE = "DELETE",
  /** @type {4} */
  ADMIN_DELETE = "ADMIN_DELETE",
}

/**
 * @type POST 요청 Type
 * @property {number} descID - 고유 식별자
 * @property {string} title - 제목
 * @property {string} description - 내용
 * @property {string} type - 카테고리 분류
 * @property {boolean} isDone - 체크 여부
 * @property {string} name - 어드민페이지 정보
 * @property {CRUD} POST - POST요청 TYPE
 */
export interface SelectableFormData {
  descID: number;
  title?: string;
  description?: string;
  type?: string;
  isDone?: boolean;
  NAME?: string;
  POST: CRUD;
}

/**
 * @type CLIENT에서 전달 받는 FormData Type
 * @property {number} descID - 고유 식별자
 * @property {string} title - 제목
 * @property {string} description - 내용
 * @property {string} type - 카테고리 분류
 * @property {boolean} isDone - 체크 여부, Selectable
 */
export interface FormData {
  descID: number;
  title: string;
  description: string;
  type: string;
  isDone?: boolean;
}

/**
 * @type CLIENT에서 전달 받는 FormData Type
 * @property {number} descID - 고유 식별자
 * @property {string} title - 제목
 * @property {string} description - 내용
 * @property {string} type - 카테고리 분류
 * @property {boolean} isDone - 체크 여부
 */
export interface TaskType {
  descID: number;
  title: string;
  description: string;
  type: string;
  isDone: boolean;
}

/**
 * @type CLIENT에서 전달 받는 FormData Type
 * @property {'USER', 'ADMIN'} ROLE - 어드민 페이지 권한정보
 * @property {string} name - 어드민 페이지 전달정보
 * @property {func} editorExitHandler - 수정 modal 종료 핸들
 * @property {func} editorHandler - 수정 modal 실행 핸들
 */
export interface TaskItemType extends TaskType {
  ROLE: "USER" | "ADMIN";
  name?: string;
  editorExitHandler: () => void;
  editorHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * @type Nav에서 관리하는 FormData Type
 * @property {string} type - 카테고리 분류
 * @property {number} count - 카테고리 번호
 * @property {boolean} stat - 현재 선택한 카테고리 번호
 * @property {func} clickHandler - 카테고리 선택 핸들러
 */
export interface CategoryType {
  type: string;
  count: number;
  stat: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * @type StoreType 전체 함수 Type
 * @property {null | taskType[]} task - 전체 데이터 집합
 * @property {null | taskType[]} filteredTask - 전체 데이터 카테고리 필터 집합
 * @property {string} view - 현재 선택 카테고리 번호
 * @property {async func} loadTask - 첫 구동 데이터 불러오기 함수
 * @property {func} logoutTask - 로그아웃 데이터 초기화 함수
 * @property {func} viewTask - 현재 카테고리 선택 필터 함수
 * @property {func} deleteTask - 태스크 삭제 처리 함수
 * @property {func} createTask - 태스크 생성 처리 함수
 * @property {func} checkTask - 태스크 체크 처리 함수
 * @property {func} editTask - 태스크 수정 처리 함수
 * @property {async func} postTask - 태스크 저장 요청 함수
 */
export interface StoreType {
  task: null | TaskType[];
  filteredTask: null | TaskType[];
  view: string;
  loadTask: () => Promise<void>;
  logoutTask: () => void;
  viewTask: (task: string) => void;
  deleteTask: (id: string) => void;
  deleteAdminTask: (id: string, name: string) => void;
  createTask: (form: FormData) => void;
  checkTask: (id: string) => void;
  editTask: (id: number, form: FormData) => void;
  postTask: (form: SelectableFormData) => Promise<void>;
}
