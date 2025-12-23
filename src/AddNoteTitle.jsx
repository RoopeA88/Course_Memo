import {useStore} from "./store.js";

function AddNoteTitle(){
    const courseName = useStore(state => state.activeCourseName);
    return(
        <div id="addNoteTitleDiv">Write notes for the course: {courseName}</div>
    )
}

export default AddNoteTitle