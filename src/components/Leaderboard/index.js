import React from "react";

function Leaderboard(props) {
    return (
        // <div className="leaderboard-wrapper">
        //     {props.displayLeaders()}
        // </div>
        <div className={"leader-modal modal " + props.attribute}>
        <div className="modal-background"></div>
        <div className="modal-content has-background-white">
            <header className="modal-card-head">
                <p className="modal-card-title">Top Memes</p>
                <button className="delete" onClick={() => props.hideModal("leader")} aria-label="close"></button>
            </header>
                <div className="leaderboard-wrapper columns">
                    {props.displayLeaders()}
                </div>
        </div>
        </div>
        
    )
}

{/* <div className={"leader-modal modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <header className="modal-card-head">
                    <p className="modal-card-title">Top Memes</p>
                    <button className="delete" onClick={() => props.hideModal("leader")} aria-label="close"></button>
                </header>
                    <div className="leaderboard-wrapper columns">
                        {props.displayLeaders()}
                    </div>
            </div>
        </div> */}

export default Leaderboard;