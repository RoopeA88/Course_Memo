import {useStore} from "./store";

function ListNotesArea(){
    const sessionId = useStore((state) => state.sessionId);
    const activeCourseName = useStore(state => state.activeCourseName);
    const noteListWithSessionId = useStore(state => state.noteListWithSessionId);
    return (
        <div id="listNotesAreaWrapper">
            <div id="listNotesAreaDiv">
                <div id="listNotesTitleDiv">Notes written for the course: {activeCourseName} <br/> Session id: {sessionId}</div>
                <div id="sessionNotesDiv">
                {noteListWithSessionId.map((note) =>{
                    if(note.sessionId == sessionId){
                        return <div className="currentSessionMappedDiv">  
                            {note.text}
                        </div>
                    }
                    return;
                })}
            </div>
            </div>
            
        </div>
    )
}

export default ListNotesArea