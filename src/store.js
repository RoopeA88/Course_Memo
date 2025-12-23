import {create} from "zustand";

export const useStore = create((set,get) =>({

    courseName: "",

    setCourseName: (newCourseName) => set({courseName: newCourseName}),

    courseList: [],

    noteList: [],

    activeCourse: -1,

    activeCourseName: "none",

    setActiveCourse: (newActiveCourse) => set({activeCourse: newActiveCourse}),

    noteListWithSessionId: [],

    courseInfoSwitch: false,

    setCourseInfoSwitch: (newBoolean) => set({courseInfoSwitch: newBoolean}),
    
    emptyCourseErrorSwitch: false,

    setEmptyCourseErrorSwitch: (errorBoolean) => set({emptyCourseErrorSwitch: errorBoolean}),

    duplicateCoursesErrorSwitch: false,

    setDuplicateCoursesErrorSwitch: (errorBoolean) => set({duplicateCoursesErrorSwitch: errorBoolean}),

    sessionStatus: false,

    SessionId: 0,

    setSessionStatus: (sessionBoolean) => set({sessionStatus: sessionBoolean}),

    sessionStatusErrorSwitch: false,

    setSessionStatusErrorSwitch: (sessionStatusErrorBoolean) => set({sessionStatusErrorSwitch: sessionStatusErrorBoolean}),

    noteBoolean: false,

    setCourseList: (newCourseList) => set((state) =>({
        courseList: [...state.courseList, ...newCourseList]
    })),
    setNotesList: (newNotesList) => set ((state) => ({
        noteList: [...state.noteList, ...newNotesList]
    })),
    fetchCourses: async () => {
        try{
            const courseResponse = await fetch("https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses");
            const apiCourses = await courseResponse.json();
            get().setCourseList(apiCourses);
        } catch (error){
            console.log("Failed to fetch courses", error)
        }
    },
    fetchNotes: async () => {
        try{
            const noteResponse = await fetch("https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes");
            const apiNotes = await noteResponse.json();
            get().setNotesList(apiNotes);
        } catch (error){
            console.log("Failed to fetch notes" + error);
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
        const uniqueSession = crypto.randomUUID();
        set((state) =>({
            sessionId: uniqueSession
        }))
    },
    transferApiNotes: () => {
        const originalNoteList = get().noteList;
        
        for(let i = 0; i<originalNoteList.length; i++){
            const note = {
                id: originalNoteList[i].id,
                text: originalNoteList[i].text,
                course: {
                    id: originalNoteList[i].course.id,
                    name: originalNoteList[i].course.name,
                },
                timestamp: originalNoteList[i].timestamp,
                sessionId: -1
            }
            set((state) =>({
                noteListWithSessionId:[...state.noteListWithSessionId, note]
            }));
        }

    },
    getFormattedTimestamp: () => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    add: (courseId) => {
        get().setActiveCourse(courseId);
        const courseList = get().courseList;
        for(let i = 0; i<courseList.length;i++){
            if(courseList[i].id == courseId){
                set({activeCourseName: courseList[i].name});
                set({noteBoolean: true});
            }
        }
    }

    
}));
