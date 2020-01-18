import React from "react";
import MemeGenerator from '../MemeGenerator'
import "./style.css";

function MemeModal(props) {
    return (
        <div id="generator" className="generator-modal modal">
            <div className="modal-background"></div>
            <div className="modal-content has-background-white meme-gen-container">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create a Meme</p>
                <button className="delete" onClick={() => props.toggleModal("generator")} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <MemeGenerator />
                </section>
            </div>
        </div>
    )
}

export default MemeModal;