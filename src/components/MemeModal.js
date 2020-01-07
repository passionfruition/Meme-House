import React from "react";

function MemeModal(props) {
    return (
        <div className={"modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <h1>helloooo, test</h1>
            </div>
            <button className="modal-close is-large" onClick={props.hideModal} aria-label="close"></button>
        </div>
    )
}

export default MemeModal;