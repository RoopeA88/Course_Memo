import {useStore} from "./store.js"

function Courses(){
    const courseList = useStore((state) => state.courseList);
    const add = useStore(( state) => state.add);
    const delCourse = useStore((state) => state.delCourse);
    return(
        <div id="coursesMainDiv">
            <div id="coursesTitleDiv">
                <p>Courses</p>
            </div>
            <div id="coursesListedDiv">
                {courseList.map((course) => (
                    <div className="mappedCourseWrapperDiv" key={course.id}>
                        <div className="mappedCourseDiv"><p>{course.name}</p></div>
                        <button className="addNoteCourses" onClick={() => add(course.id)}>ADD</button>
                        <button className="deleteCourse"onClick={() => delCourse(course.id)}>DEL</button>
                    </div>
    ))}

                
            </div>
        </div>
    )
}

export default Courses