import React from "react";

import './InfoBar.css';

import closeIcon from "../../Icons/closeIcon.png";
import onlineIcon from "../../Icons/onlineIcon.png";


const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"></img>
            <h3>{room}</h3>
        </div>
        <div className="RightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image"></img></a>
        </div>
    </div>
)

export default InfoBar;