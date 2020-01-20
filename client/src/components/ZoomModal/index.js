import React from "react";
import './style.css';

function ZoomModal(props) {
    return (
        <div id="zoom" className="zoom-modal modal">
            <div className="modal-background"></div>
            <div className="modal-content has-background-white ">
                <p className="image is-loading">
                    <img src={props.clickedMemeUrl} alt="meme"></img>
                </p>
                <div className="social-section">
                    <span data-id={props.clickedMemeId} onClick={() => props.likeMeme()} className="like-button"><i className="fas fa-crown"></i></span>
                    <span>  {props.clickedMemeLikes} {props.date}</span>
                </div>
                <button className="modal-close is-large" onClick={() => props.toggleModal("zoom")} aria-label="close"></button>
            </div>
        </div>
    )
}

export default ZoomModal;