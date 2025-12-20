import { useState } from 'react'
import Header from "./Header"
import Courses from "./Courses"
import AddCourses from "./AddCourses"
import ListNotes from "./ListNotes"
function App() {
  

  return (
    <>
      <div id="mainDiv">
        <div id="mainProgramDiv">
          <Header/>
          <div id="mainProgramWrapperDiv">
            <Courses/>
            <AddCourses/>
            <ListNotes/>
          </div>
          <div id="memoInputAndListingDiv">

          </div>
        </div>
        <div id="programNameMainDiv">
          
          <div className="courseMemo" id="topC"><h1>C</h1></div>
          <div className="courseMemo"><h1>O</h1></div>
          <div className="courseMemo"><h1>U</h1></div>
          <div className="courseMemo"><h1>R</h1></div>
          <div className="courseMemo"><h1>S</h1></div>
          <div className="courseMemo"><h1>E</h1></div>
          <div className="courseMemo"><h1> </h1></div>
          <div className="courseMemo"><h1>M</h1></div>
          <div className="courseMemo"><h1>E</h1></div>
          <div className="courseMemo"><h1>M</h1></div>
          <div className="courseMemo"><h1>O</h1></div>
        </div>
      </div>
    </>
  )
}

export default App
