import {useStore} from "./store.js"

function AddCourses(){

    const courseName = useStore(state => state.courseName);
    const setCourseName = useStore(state => state.setCourseName);

    return(
        <div id="addCoursesWrapperDiv">
            <div id="addCourseDiv">
                <div id="addCourseButtonDiv">
                    <button id="addCourseButton">Add Course</button>
                </div>
                <div id="addCourseInputDiv">
                    <input id="addCourseInput" placeholder="Input the course name" value={courseName} onChange={(e) => setCourseName(e.target.value)}></input>
                </div>
            </div>
            <div id="addedCourseInfoDiv">

            </div>
        </div>
    )
}

export default AddCourses