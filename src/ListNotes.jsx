import { useState } from "react"
import {useStore} from "./store"
function ListNotes(){
    function openDropDown(){
        setIsOpen(!isOpen);
    }
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <div id="listNotesWrapper">
            <div id="listNotesButtonDiv">
                <button id="listNotesButton">List Notes</button>
            </div>
            <div id="listNotesFilterDiv">
                <button id="listNotesFilterButton" onClick={openDropDown}>Filter</button>
            </div>
            {isOpen &&(
                <div id="dropDownDiv">
                    <button className="dropDownButton">testi1</button>
                    <button className="dropDownButton">testi2</button>
                    <button className="dropDownButton">testi3</button>
                    <button className="dropDownButton">testi3</button>
                    
                    
                    
                </div>
            )}
        </div>
    )
}

export default ListNotes