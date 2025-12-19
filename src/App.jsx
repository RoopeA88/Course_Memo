import { useState } from 'react'
import Header from "./Header"
import Courses from "./Courses"
function App() {
  

  return (
    <>
      <div id="mainDiv">
        <div id="mainProgramDiv">
          <Header/>
          <div id="mainProgramWrapperDiv">
            <Courses/>
          </div>
          <div id="memoInputAndListingDiv">

          </div>
        </div>
        <div id="programNameMainDiv">

        </div>
      </div>
    </>
  )
}

export default App
