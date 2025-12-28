import {useStore} from "./store";

function ListNotesButtonArea(){
    const allOrSpecificId = useStore(state => state.allOrSpecificId);
    const noteListWithSessionId = useStore(state => state.noteListWithSessionId);
    const allCourses = useStore(state => state.allCourses);
    const courseNameForListingTitle = useStore(state => state.courseNameForListingTitle);
    return(
        <div id="listNotesButtonAreaWrapper">
            <div id="listNotesButtonAreaTitle">
                Notes for the course: {courseNameForListingTitle} 
            </div>
            <div id="listNotesButtonAreaDiv">
                {noteListWithSessionId.map((note) => {
                    if(allCourses){
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
            </div>
        </div>
    )
}

export default ListNotesButtonArea;