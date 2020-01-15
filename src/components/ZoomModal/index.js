import React from "react";
import './style.css';

function ZoomModal(props) {
    return (
        <div id="zoom" className="zoom-modal modal">
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <p className="image">
                    <img src={props.clickedMemeUrl} alt="meme"></img>
                    <div >
                        <button data-id={props.clickedMemeId} onClick={() => props.likeMeme()} className="button like-button"><i className="fas fa-thumbs-up"></i></button>
                    </div>
                </p>
                <button className="modal-close is-large" onClick={() => props.toggleModal("zoom")} aria-label="close"></button>
            </div>
        </div>
    )
}

export default ZoomModal;