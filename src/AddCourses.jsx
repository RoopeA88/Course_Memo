import {useStore} from "./store.js"

function AddCourses(){
    const addCourse = useStore(state => state.addCourse);
    const courseName = useStore(state => state.courseName);
    const setCourseName = useStore(state => state.setCourseName);
    const courseInfoSwitch = useStore(state => state.courseInfoSwitch);
    const courseList = useStore(state => state.courseList);
    const emptyCourseErrorSwitch = useStore(state => state.emptyCourseErrorSwitch);
    const duplicateCoursesErrorSwitch = useStore(state => state.duplicateCoursesErrorSwitch);
    const sessionStatusErrorSwitch = useStore(state => state.sessionStatusErrorSwitch);

    return(
        <div id="addCoursesWrapperDiv">
            <div id="addCourseDiv">
                <div id="addCourseButtonDiv">
                    <button id="addCourseButton" onClick={() => addCourse(courseName)}>Add Course</button>
                </div>
                <div id="addCourseInputDiv">
                    <input id="addCourseInput" placeholder="Input the course name" value={courseName} onChange={(e) => setCourseName(e.target.value)}></input>
                </div>
            </div>
            <div id="addedCourseInfoDiv">
                { courseInfoSwitch && (
                <div id="toggleableCourseInfoDiv">Opintojakso {courseList[courseList.length-1].name} lisätty ID:llä {courseList[courseList.length-1].id}</div>
                    )}
                {emptyCourseErrorSwitch && (
                    <div id="emptyCourseDiv">The input cannot be empty.</div>
                )}
                {duplicateCoursesErrorSwitch && (
                    <div id="duplicateCourseDiv">Course already exists.</div>
                )}
                {sessionStatusErrorSwitch && (
                    <div id="sessionStatusErrorDiv">Session has to be active. Start a new session.</div>
                )}
            </div>
        </div>
    )
}

export default AddCourses