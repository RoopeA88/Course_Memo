import {useStore} from "./store"

function AddNoteInput(){
    return(
    <div id="addNoteInputWrapperDiv">
        <div id="addNoteInputDiv">
            
            <input id="addNoteInputField" placeholder="Input your note"></input>
            <div id="betweenInputDiv"></div>
            <div id="inputInfoDiv">

            </div>
        </div>
        <div id="addNoteButtonsDiv">
            <button id="addNoteButton">Add Note</button>
            <button id="saveNotesButton">Save Notes</button>
        </div>
    </div>
    )
}

export default AddNoteInput