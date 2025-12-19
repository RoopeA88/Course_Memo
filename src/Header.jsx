function Header(){
    return(
        <div id="mainHeaderDiv">
            <div id="mainSessionDiv">
                <div id="sessionTextDiv">
                    <p>Session Status:</p>
                </div>
                <div id="onOffMainDiv">
                    <div id="onOffTextDiv">
                        <p>Locked</p>
                    </div>
                </div>
            </div>
            <div id="startSessionDiv">
                <button id="startSessionButton"> Start Session</button>
            </div>
        </div>
    )
}

export default Header