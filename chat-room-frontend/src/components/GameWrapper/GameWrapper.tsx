import {AppUser} from "../../Utils/Interfaces";
import React, {ReactNode} from "react";

function GameWrapper({appUser, setAppUser, children}: { appUser:AppUser|undefined, setAppUser:React.Dispatch<any>, children:ReactNode}){

    return (appUser !== undefined) ?
        <>
            <div>
                {children}
            </div>
        </> :
        <></>
}

export default GameWrapper