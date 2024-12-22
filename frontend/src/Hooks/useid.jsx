import create from "zustand";
import { devtools } from "zustand/middleware";
const Board = (set) => ({
    id: null,
    setId: (id) => {
        set({ id: id });
        console.log("id", id);
    },
});
export const useId = create(devtools(Board));
