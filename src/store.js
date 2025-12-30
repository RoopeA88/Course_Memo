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

    noteText: "",
    
    listNotesBoolean: false,

    disableAddBoolean: false,

    lockedAddButtonError: false,

    inputMessage: "",

    

    inputMessageColor: "yellow",

    listNotesErrorBoolean: false,

    

    listNotesButtonBoolean: false,

    allCourses: null,

    specificCourse: -1,

    courseNameForListingTitle: "",

    setNoteText: (newNoteText) => set({noteText: newNoteText}),

    setCourseList: (newCourseList) => set((state) =>({
        courseList: [...state.courseList, ...newCourseList]
    })),
    setNotesList: (newNotesList) => set ((state) => ({
        noteList: [...state.noteList, ...newNotesList]
    })),
    setNoteListWithSessionId: (newList) => set ((state) => ({
        noteListWithSessionId: [...state.noteListWithSessionId, ...newList]
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
    getLargestNoteId: () =>{
        let biggest = 0;
        const noteList = get().noteListWithSessionId;
        for(let i = 0; i< noteList.length; i++){
            if(noteList[i].id > biggest){
                biggest = noteList[i].id;
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
        set({sessionStatusErrorSwitch: false})
        set({disableAddBoolean: false})
        const uniqueSession = crypto.randomUUID();
        set({listNotesBoolean: false})
        set((state) =>({
            sessionId: uniqueSession
        }))
    },
    transferApiNotes: () => {
        const originalNoteList = get().noteList;
        
        const newNoteList = originalNoteList.map((note) =>({
            id: note.id,
            text: note.text,
            course: {
                id: note.course.id,
                name: note.course.name,
            },
            timestamp: note.timestamp,
            sessionId: -1
        }));
        get().setNoteListWithSessionId(newNoteList);

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
        
        if(get().disableAddBoolean == true){
            set({inputMessageColor: "red"})
            set({inputMessage: "You cannot change the course after adding a note."});
            return;
        }
        if(get().sessionStatus == false){
            set({emptyCourseErrorSwitch: false});
            get().setSessionStatusErrorSwitch(true);
            return;
        }
        if(get().sessionStatus == true){
            get().setSessionStatusErrorSwitch(false);
        }
        get().setActiveCourse(courseId);
        const courseList = get().courseList;
        for(let i = 0; i<courseList.length;i++){
            if(courseList[i].id == courseId){
                set({emptyCourseErrorSwitch: false});
                set({listNotesButtonBoolean: false});
                set({activeCourseName: courseList[i].name});
                set({noteBoolean: true});
            }
        }
    },
    addNote: () =>{
        const activeCourseId = get().activeCourse;
        let noteText1 = get().noteText;
        const sessionId = get().sessionId;
        const activeCourseName = get().activeCourseName;
        const biggestId = get().getLargestNoteId();
        const timestamp = get().getFormattedTimestamp();
        const noteListWithSessionId = get().noteListWithSessionId
        
        if(noteText1 == ""){
            set({inputMessageColor: "red"});
            set({inputMessage: "Note cannot be empty."});
            return;
        }
        if(noteText1.length > 74){
            noteText1 = noteText1.slice(0, 74);
        }

        const note = {
            id: biggestId+1,
            text: noteText1,
            course: {
                id: activeCourseId,
                name: activeCourseName,
            },
            timestamp: timestamp,
            sessionId: sessionId,
        }
        set((state) => ({
            noteListWithSessionId: [...state.noteListWithSessionId, note]
        }));
        
        set({noteText: ""});
        set({inputMessageColor: "green"});
        set({inputMessage: "Note (ID:" + biggestId + ") added for the course "+activeCourseName+"."});
        set({listNotesErrorBoolean: true});
        set({disableAddBoolean: true});
    },
    saveNote: () => {
        set({inputMessage: ""});
        set({sessionStatus: false});
        set({noteBoolean: false});
        set({listNotesBoolean: true});
        set({listNotesErrorBoolean: false});

    },
    listNotesButton: (allOrSpecificId) =>{
        if(get().listNotesErrorBoolean == true){
            set({inputMessageColor: "red"});
            set({inputMessage: "You cannot list notes after adding a note"});
            return;
        }
        if(get().sessionStatus == false){
            get().setSessionStatusErrorSwitch(true);
            return;
        }
        set({listNotesBoolean: false});
        set({listNotesButtonBoolean: true});
        if(allOrSpecificId == "all"){
            set({noteBoolean: false})
            set({courseNameForListingTitle: "all"});
            set({allCourses: true});
        } else{
            set({noteBoolean: false})
            set({allCourses: false});
            set({specificCourse: allOrSpecificId})
            const whichCourse = get().courseList.find(course => course.id === get().specificCourse);
            set({courseNameForListingTitle: whichCourse.name});
        }

    },
    delCourse: (courseId) =>{
        let newCourseList = get().courseList;
        const targetedCourse = newCourseList.find(({id}) => id === courseId);
        newCourseList = newCourseList.filter(course => course.id !== targetedCourse.id);
        set({courseList: newCourseList});
        let newNotes = get().noteListWithSessionId;
        newNotes = newNotes.filter(note =>  note.course.id !== courseId);
        set({noteListWithSessionId: newNotes});
        if(get().activeCourse == courseId){
            set({noteBoolean: false});
            set({courseInfoSwitch: false});
        }
        if(get().noteListWithSessionId.length == 0){
            set({noteBoolean: false});
            set({courseInfoSwitch: false});
        }
    },
    delNote: (noteId) => {
        let newNoteList = get().noteListWithSessionId;
        const targetedNote = newNoteList.find(({id}) => id === noteId);
        newNoteList = newNoteList.filter(note => note.id !== targetedNote.id);
        set({noteListWithSessionId: newNoteList});
    },
    doesNoteForSpecificCourseExist: (courseId) => {
        const notes = get().noteListWithSessionId;
        let numberOfNotes = 0;

        for(let i = 0; i<notes.length; i++){
            if(notes[i].course.id === courseId){
                numberOfNotes++;
            }
        }
        return numberOfNotes;
    }



    
}));
