import React from "react"
import { withRouter, useHistory } from "react-router-dom";

import { useScrollY } from "../Hooks/useScrollY";

import FloatingPlayBtn from "../Atoms/FloatingPlayBtn";

function FloatingBtnWrap(){
    let history = useHistory();
    const {displayPlay_memo} = useScrollY({y: 450})

    const pathSet = history.location.pathname.split("/");

    return(
        <>
        {pathSet[1] !== "play" 
        && pathSet[1] !== "profile" 
        && pathSet[1] !== "create" 
        && pathSet[1] !== "accept" 
        && pathSet[1] !== "" && <FloatingPlayBtn />}
        {pathSet[1] == "" && <div style={{display: displayPlay_memo ? "block" : "none"}}><FloatingPlayBtn  /></div> }
        </>
    )
}

export default React.memo(withRouter(FloatingBtnWrap))