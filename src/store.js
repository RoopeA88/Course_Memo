import {create} from "zustand";

export const useStore = create((set,get) =>({

    courseName: "",

    setCourseName: (newCourseName) => set({courseName: newCourseName}),

    courseList: [],

    courseInfoSwitch: false,

    setCourseInfoSwitch: (newBoolean) => set({courseInfoSwitch: newBoolean}),
    
    emptyCourseErrorSwitch: false,

    setEmptyCourseErrorSwitch: (errorBoolean) => set({emptyCourseErrorSwitch: errorBoolean}),

    

    setCourseList: (newCourseList) => set((state) =>({
        courseList: [...state.courseList, ...newCourseList]
    })),
    fetchCourses: async () => {
        try{
            const courseResponse = await fetch("https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses")

            const apiCourses = await courseResponse.json();
            get().setCourseList(apiCourses);
        } catch (error){
            console.log("Failed to fetch courses", error)
        }
    },
    addCourse: (courseName) =>{
        if(courseName.trim() == ""){
            get().setCourseInfoSwitch(false);
            get().setEmptyCourseErrorSwitch(true);
            return;
        }
        get().setEmptyCourseErrorSwitch(false);
        const largestId = get().getLargestId();
        const course = {
            name: courseName,
            id: largestId+1
        };
        set((state) =>({
            courseList: [...state.courseList, course]
        }));
        get().setCourseInfoSwitch(true);
        get().setCourseName("");
    },
    getLargestId: () =>{
        let biggest = 0;
        const courseList = get().courseList;
        for(let i = 0; i< courseList.length; i++){
            if(courseList[i].id > biggest){
                biggest = courseList[i].id;
            }
        }
        return biggest;

    },

    checkForDuplicateCourseNames: (courseName) =>{
        const courseList = get().courseList;
        for(let i = 0; i<courseList.length; i++){
            if(courseList[i].name == courseName){
                return false;
            }
        }
        return true;
    }
    
}));
