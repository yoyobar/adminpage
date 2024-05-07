import axios from "axios";
import { create } from "zustand";
import { StoreType } from "./types";

// {descID: 1, title: 'Title3', description: 'Description3', type: 'ETC', stat: 0}

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
        return { ...state, filteredTask: state.task };
      } else {
        return {
          ...state,
          view: view,
          filteredTask: state.task!.filter((item) => view === item.type),
        };
      }
    });
  },
  deleteTask: (id: string) => {
    set((state) => {
      const updatedTask = state.task!.filter((item) => id !== String(item.descID));
      let filteredTask: { descID: number; title: string; description: string; type: string }[];
      if (state.view === "ALL") {
        filteredTask = updatedTask;
      } else {
        filteredTask = updatedTask.filter((item) => item.type === state.view);
      }

      console.log(state.filteredTask);

      return {
        ...state,
        task: updatedTask,
        filteredTask: filteredTask,
      };
    });
  },
  createTask: (form) => {
    console.log(form);
    set((state) => {
      const updatedTask = {
        descID: state.task ? state.task.length + 1 : 1,
        title: form.title,
        description: form.description,
        type: form.type,
        stat: Number(form.stat),
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
