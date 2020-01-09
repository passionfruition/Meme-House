import React from "react";

function MemeModal(props) {
    return (
        <div className={"generator-modal modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
            <header class="modal-card-head">
            <p class="modal-card-title">Meme Generator</p>
            <button class="delete" onClick={() => props.hideModal("generator")} aria-label="close"></button>
            </header>
            </div>
        </div>
    )
}

export default MemeModal;