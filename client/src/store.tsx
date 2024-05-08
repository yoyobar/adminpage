import axios from "axios";
import { create } from "zustand";
import { StoreType } from "./types";

type ArgTaskType = {
  descID: number;
  title: string;
  description: string;
  type: string;
  stat: number;
  isDone: boolean;
}[];

const useTask = create<StoreType>((set) => ({
  task: null,
  filteredTask: null,
  view: "ALL",

  loadTask: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string);
      const data = await axios.post("http://localhost:3001/task", token);
      set({ task: data.data, filteredTask: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  cleanTask: () => {
    set({ task: null, filteredTask: null });
  },

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
          return {
            ...item,
            title: form.title,
            description: form.description,
            type: form.type,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      let filteredTask: ArgTaskType;
      if (state.view === "ALL") {
        filteredTask = editedTask;
      } else {
        filteredTask = editedTask.filter((item) => item.type === state.view);
      }

      return {
        ...state,
        task: editedTask,
        filteredTask: filteredTask,
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
      let filteredTask: ArgTaskType;
      if (state.view === "ALL") {
        filteredTask = checkedTask;
      } else {
        filteredTask = checkedTask.filter((item) => item.type === state.view);
      }

      return {
        ...state,
        task: checkedTask,
        filteredTask: filteredTask,
      };
    });
  },

  deleteTask: (id: string) => {
    set((state) => {
      const updatedTask = state
        .task!.filter((item) => Number(item.descID) !== Number(id))
        .map((item) => {
          if (Number(item.descID) > Number(id)) {
            return {
              ...item,
              descID: Number(item.descID) - 1,
            };
          } else {
            return { ...item };
          }
        });
      let filteredTask: ArgTaskType;
      if (state.view === "ALL") {
        filteredTask = updatedTask;
      } else {
        filteredTask = updatedTask.filter((item) => item.type === state.view);
      }

      return {
        ...state,
        task: updatedTask,
        filteredTask: filteredTask,
      };
    });
  },
  createTask: (form) => {
    set((state) => {
      const updatedTask = {
        descID: state.task ? state.task.length + 1 : 1,
        title: form.title,
        description: form.description,
        type: form.type,
        stat: 0,
        isDone: form.isDone,
      };
      let updatedTasks;

      if (state.task) {
        updatedTasks = [...state.task, updatedTask];
      } else {
        updatedTasks = [updatedTask];
      }

      return {
        ...state,
        task: updatedTasks,
      };
    });
  },
}));

export default useTask;
