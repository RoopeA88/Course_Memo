import {useStore} from "./store.js"

function Header(){
    const sessionStatus = useStore((state) => state.sessionStatus);
    const openSession = useStore((state) => state.openSession);

    return(
        <div id="mainHeaderDiv">
            <div id="mainSessionDiv">
                <div id="sessionTextDiv">
                    <p>Session Status:</p>
                </div>
                <div id="onOffMainDiv">
                    {!sessionStatus &&(
                        <div id="offTextDiv">
                        <p>Locked</p>
                    </div>
                    )}
                    {sessionStatus &&(
                        <div id="onTextDiv">
                            <p>Active</p>
                        </div>
                    )}
                    
                </div>
            </div>
            <div id="startSessionDiv">
                <button id="startSessionButton" onClick={() => openSession()}> Start Session</button>
            </div>
        </div>
    )
}

export default Header