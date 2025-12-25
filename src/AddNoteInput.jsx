import {useStore} from "./store"

function AddNoteInput(){
    const noteText = useStore((state) => state.noteText);
    const setNoteText = useStore((state) => state.setNoteText);
    const addNoteFunction = useStore((state) => state.addNote);
    const inputMessage = useStore((state) => state.inputMessage);
    return(
    <div id="addNoteInputWrapperDiv">
        <div id="addNoteInputDiv">
            
            <input id="addNoteInputField" placeholder="Input your note" value={noteText} onChange={(e) => setNoteText(e.target.value)}></input>
            <div id="betweenInputDiv"></div>
            <div id="inputInfoDiv">
                {inputMessage}
            </div>
        </div>
        <div id="addNoteButtonsDiv">
            <button id="addNoteButton" onClick={() => addNoteFunction()}>Add Note</button>
            <button id="saveNotesButton">Save Notes</button>
        </div>
    </div>
    )
}

export default AddNoteInput