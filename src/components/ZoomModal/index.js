import React from "react";

function ZoomModal(props) {
    return (
        <div className={"zoom-modal modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <img src="" alt="meme"></img>
                <div className="like-button">
                    <button className="button"><i className="fas fa-thumbs-up"></i></button>
                </div>
                <button className="modal-close is-large" onClick={() => props.hideModal("zoom")} aria-label="close"></button>
            </div>
        </div>
    )
}

export default ZoomModal;