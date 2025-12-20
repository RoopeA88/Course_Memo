import {create} from "zustand";

export const useStore = create((set,get) =>({

    courseName: "",
    setCourseName: (newCourseName) => set({courseName: newCourseName}),
}));
