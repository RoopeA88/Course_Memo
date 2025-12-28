import { useState } from "react"
import {useStore} from "./store"
function ListNotes(){
    function openDropDown(){
        setIsOpen(!isOpen);
    }
    const [isOpen, setIsOpen] = useState(false);
    const courseList = useStore(state => state.courseList);
    const listNotesButton = useStore(state => state.listNotesButton);
    return(
        <div id="listNotesWrapper">
            <div id="listNotesButtonDiv">
                <button id="listNotesButton" onClick={() => listNotesButton("all")}>List Notes</button>
            </div>
            <div id="listNotesFilterDiv">
                <button id="listNotesFilterButton" onClick={openDropDown}>Filter</button>
            </div>
            {isOpen &&(
                <div id="dropDownDiv">
                    {courseList.map((course) =>(
                        <button className="dropdownButton" key={course.id} onClick={() => listNotesButton(course.id)}>{course.name}</button>
                    ))}
                    
                    
                    
                </div>
            )}
        </div>
    )
}

export default ListNotes