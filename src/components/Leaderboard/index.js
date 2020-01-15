import React from "react";
import "./style.css";

function Leaderboard(props) {
    return (
        <div>
            <h1>Top Memes</h1>
            <div className="scrolling-wrapper">
                    {props.displayLeaders()}
            </div>
        </div>
        
    )
}
export default Leaderboard;