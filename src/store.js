import {create} from "zustand";

export const useStore = create((set,get) =>({

    courseName: "",

    setCourseName: (newCourseName) => set({courseName: newCourseName}),

    courseList: [],

    courseInfoSwitch: false,

    setCourseInfoSwitch: (newBoolean) => set({courseInfoSwitch: newBoolean}),
    
    emptyCourseErrorSwitch: false,

    setEmptyCourseErrorSwitch: (errorBoolean) => set({emptyCourseErrorSwitch: errorBoolean}),

    duplicateCoursesErrorSwitch: false,

    setDuplicateCoursesErrorSwitch: (errorBoolean) => set({duplicateCoursesErrorSwitch: errorBoolean}),

    sessionStatus: false,

    setSessionStatus: (sessionBoolean) => set({sessionStatus: sessionBoolean}),

    sessionStatusErrorSwitch: false,

    setSessionStatusErrorSwitch: (sessionStatusErrorBoolean) => set({sessionStatusErrorSwitch: sessionStatusErrorBoolean}),

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
        const duplicateChecker = get().checkForDuplicateCourseNames(courseName);
        if(courseName.trim() == ""){
            get().setDuplicateCoursesErrorSwitch(false);
            get().setCourseInfoSwitch(false);
            get().setSessionStatusErrorSwitch(false);
            get().setEmptyCourseErrorSwitch(true);
            return;
        } if(duplicateChecker == true){
            get().setEmptyCourseErrorSwitch(false);
            get().setCourseInfoSwitch(false);
            get().setSessionStatusErrorSwitch(false);
            get().setDuplicateCoursesErrorSwitch(true);
            get().setCourseName("");
            return;
        } if(get().sessionStatus == false){
            get().setEmptyCourseErrorSwitch(false);
            get().setDuplicateCoursesErrorSwitch(false);
            get().setCourseInfoSwitch(false);
            get().setSessionStatusErrorSwitch(true);
            get().setCourseName("");
            return;
        } if(courseName.length >16){
            courseName = courseName.slice(0, 16);
        }
        get().setDuplicateCoursesErrorSwitch(false);
        get().setEmptyCourseErrorSwitch(false);
        get().setSessionStatusErrorSwitch(false);
        const largestId = get().getLargestId();
        const course = {
            name: courseName.toLowerCase(),
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
                return true;
            }
        }
        return false;
    },
    openSession: () => {
        get().setSessionStatus(true);
    }
    
}));
