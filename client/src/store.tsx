import axios from "axios";
import { create } from "zustand";
import { StoreType } from "./types";

const useTask = create<StoreType>((set) => ({
  task: null,

  loadTask: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string);
      const data = await axios.post("http://localhost:3001/task", token);
      set({ task: data.data });
    } catch (error) {
      console.log(error);
    }
  },
  cleanTask: () => {
    set({ task: null });
  },
}));

export default useTask;
