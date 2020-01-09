import React from "react";

function Leaderboard(props) {
    return (
        <div className="leaderboard-wrapper">
            <h1 className="subtitle">Top Memes</h1>
            {props.displayLeaders()}
        </div>
    )
}

export default Leaderboard;