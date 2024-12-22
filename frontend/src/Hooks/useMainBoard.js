import create from "zustand";
import { devtools } from "zustand/middleware";
const Board = (set) => ({
  name: "Dashboard",
  setName: (name) => {
    set({ name: name });
    console.log("name", name);
  },
});
export const useBoard = create(devtools(Board));
