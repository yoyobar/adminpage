import axios from "axios";
import { create } from "zustand";
import { StoreType } from "./types";

const useTask = create<StoreType>((set) => ({
  task: null,
  filteredTask: null,

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
          filteredTask: state.task!.filter((item) => view === item.type),
        };
      }
    });
  },
}));

export default useTask;
