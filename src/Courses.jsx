import {useStore} from "./store.js"

function Courses(){
    const courseList = useStore((state) => state.courseList);
    
    return(
        <div id="coursesMainDiv">
            <div id="coursesTitleDiv">
                <p>Courses</p>
            </div>
            <div id="coursesListedDiv">
                {courseList.map((course) => (
                    <div className="mappedCourseWrapperDiv" key={course.id}>
                        <div className="mappedCourseDiv"><p>{course.name}</p></div>
                    </div>
    ))}

                
            </div>
        </div>
    )
}

export default Courses