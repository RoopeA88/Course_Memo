import {useStore} from "./store";

function ListNotesButtonArea(){
    const specificCourse = useStore(state => state.specificCourse);
    const noteListWithSessionId = useStore(state => state.noteListWithSessionId);
    const allCourses = useStore(state => state.allCourses);
    const courseNameForListingTitle = useStore(state => state.courseNameForListingTitle);
    const doesNoteForSpecificCourseExist = useStore(state => state.doesNoteForSpecificCourseExist);
    return(
        <div id="listNotesButtonAreaWrapper">
            <div id="listNotesButtonAreaTitle">
                Notes for the course: {courseNameForListingTitle} 
            </div>
            <div id="listNotesButtonAreaDiv">
                {noteListWithSessionId.map((note) => {
                    if(allCourses && noteListWithSessionId.length >0){
                        return(
                            <div className="allListedCoursesWrapper" key={note.id}>
                                <div className="listedCoursesInfoWrapper">
                                    <div className="listedCoursesCourseName">Course: {note.course.name}</div>
                                    <div className="listedCoursesId">Note Id: {note.id}</div>
                                    <div className="listedCoursesTimestamp">{note.timestamp}</div>
                                </div>
                                <div className="listedCoursesTextWrapper">
                                    <div className="deleteNoteButtonDiv">
                                        <button className="deleteNote">DEL</button>
                                    </div>
                                    <div className="listedCoursesText">
                                        
                                        <p>{note.text}</p>
                                    </div>
                                    </div>
                                </div>
                        )
                        

                        
                    } if(allCourses == false && note.course.id == specificCourse){
                        return(
                            <div className="allListedCoursesWrapper" key={note.id}>
                                <div className="listedCoursesInfoWrapper">
                                    <div className="listedCoursesCourseName">Course: {note.course.name}</div>
                                    <div className="listedCoursesId">Note Id: {note.id}</div>
                                    <div className="listedCoursesTimestamp">{note.timestamp}</div>
                                </div>
                                <div className="listedCoursesTextWrapper">
                                    <div className="deleteNoteButtonDiv">
                                        <button className="deleteNote">DEL</button>
                                    </div>
                                    <div className="listedCoursesText">
                                        
                                        <p>{note.text}</p>
                                    </div>
                                    </div>
                                </div>
                        )
                    } 
                    
                })}
                {noteListWithSessionId.length == 0 && allCourses &&(
                    <div id="noNotesDiv">
                        <p>Ei muistiinpanoja!</p>
                    </div>
                )}
                {doesNoteForSpecificCourseExist(specificCourse) == 0 && !allCourses &&(
                    <div id="noNotesDiv">
                        <p>Ei muistiinpanoja!</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ListNotesButtonArea;