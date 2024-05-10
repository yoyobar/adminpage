import axios from "axios";
import { create } from "zustand";
import { TaskType, StoreType, SelectableFormData, CRUD } from "./types";

type UpdateArgument = (task: TaskType[], view: string) => TaskType[];

const filterUpdate: UpdateArgument = (task, view) => {
  let updateData: TaskType[];
  if (view === "ALL") {
    updateData = task;
  } else {
    updateData = task.filter((item) => item.type === view);
  }
  return updateData;
};

const useTask = create<StoreType>((set) => ({
  task: null,
  filteredTask: null,
  view: "ALL",

  //? SERVER
  loadTask: async () => {
    try {
      const { token } = await JSON.parse(localStorage.getItem("token") as string);
      const data = await axios.post("http://localhost:3001/task", token);
      set({ task: data.data, filteredTask: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  postTask: async (task) => {
    try {
      const { token } = await JSON.parse(localStorage.getItem("token") as string);
      await axios.post("http://localhost:3001/update", { token, task: task });
    } catch (error) {
      console.log(error);
    }
  },

  //? LOGOUT
  logoutTask: () => {
    set({ task: null, filteredTask: null });
  },

  //? CRUD
  viewTask: (view: string) => {
    set((state) => {
      if (view === "ALL") {
        return {
          ...state,
          filteredTask: state.task,
          view: view,
        };
      } else {
        return {
          ...state,
          view: view,
          filteredTask: state.task!.filter((item) => view === item.type),
        };
      }
    });
  },

  editTask: (id, form) => {
    set((state) => {
      const editedTask = state.task!.map((item) => {
        if (Number(item.descID) === Number(id)) {
          const postForm: SelectableFormData = {
            descID: id,
            title: form.title,
            description: form.description,
            type: form.type,
            POST: CRUD.UPDATE,
          };

          state.postTask(postForm);

          return {
            ...item,
            ...postForm,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      const updateTask = filterUpdate(editedTask, state.view);

      return {
        ...state,
        task: editedTask,
        filteredTask: updateTask,
      };
    });
  },

  checkTask: (id: string) => {
    set((state) => {
      const checkedTask = state.task!.map((item) => {
        if (Number(item.descID) === Number(id)) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      const postForm: SelectableFormData = {
        descID: checkedTask[0].descID,
        isDone: checkedTask[0].isDone,
        POST: CRUD.CHECK,
      };
      state.postTask(postForm);

      const updateTask = filterUpdate(checkedTask, state.view);

      return {
        ...state,
        task: checkedTask,
        filteredTask: updateTask,
      };
    });
  },

  deleteTask: (id: string) => {
    set((state) => {
      const deletedTask = state.task!.filter((item) => Number(item.descID) !== Number(id));
      const updateTask = filterUpdate(deletedTask, state.view);

      const postForm: SelectableFormData = {
        descID: Number(id),
        POST: CRUD.DELETE,
      };
      state.postTask(postForm);

      return {
        ...state,
        task: deletedTask,
        filteredTask: updateTask,
      };
    });
  },
  createTask: (form) => {
    set((state) => {
      const createForm = {
        descID: form.descID,
        title: form.title,
        description: form.description,
        type: form.type,
        isDone: false,
      };
      let updatedTasks;

      const postForm: SelectableFormData = {
        ...createForm,
        POST: CRUD.CREATE,
      };

      state.postTask(postForm);

      if (state.task) {
        updatedTasks = [...state.task, createForm];
      } else {
        updatedTasks = [createForm];
      }

      return {
        ...state,
        task: updatedTasks,
      };
    });
  },
}));

export default useTask;
