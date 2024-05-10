import axios from "axios";
import { create } from "zustand";
import { TaskType, StoreType } from "./types";

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

  loadTask: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string);
      const data = await axios.post("http://localhost:3001/task", token);
      set({ task: data.data, filteredTask: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  updateTask: async (task) => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string);
      const data = await axios.post("http://localhost:3001/update", { token: token, task: task });
      console.log(data);
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

      return {
        ...state,
        task: deletedTask,
        filteredTask: updateTask,
      };
    });
  },
  createTask: (form) => {
    set((state) => {
      const updatedTask = {
        descID: form.descID,
        title: form.title,
        description: form.description,
        type: form.type,
        stat: 0,
        isDone: form.isDone!,
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
