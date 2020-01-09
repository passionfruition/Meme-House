import React from "react";

function ZoomModal(props) {
    return (
        <div className={"zoom-modal modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <img src={props.memeClicked} alt="meme"></img>
                <div className="like-button">
                    <a className="button"><i class="fas fa-thumbs-up"></i></a>
                </div>
                <button className="modal-close is-large" onClick={() => props.hideModal("zoom")} aria-label="close"></button>
            </div>
        </div>
    )
}

export default ZoomModal;