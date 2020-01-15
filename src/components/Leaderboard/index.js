import React from "react";
import "./style.css";

function Leaderboard(props) {
    return (
        <div className="box leaderboard">
            <h1>Top Memes</h1>
            <div className="scrolling-wrapper">
                    {props.displayLeaders()}
            </div>
        </div>
        
    )
}
export default Leaderboard;