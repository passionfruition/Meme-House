import React from "react";

function MemeModal(props) {
    return (
        <div className={"generator-modal modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <p>meme generator</p>
            <button className="modal-close is-large" onClick={() => props.hideModal("generator")} aria-label="close"></button>
            </div>
        </div>
    )
}

export default MemeModal;