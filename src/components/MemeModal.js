import React from "react";
import MemeGenerator from '../components/MemeGenerator';

function MemeModal(props) {
    return (
        <div className={"modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-card has-background-white">
                <header className="modal-card-head">
                    <p className="modal-card-title">Generate a Meme!</p>
                    <button className="modal-close is-large" onClick={props.hideModal} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <MemeGenerator />
                </section>
            </div>
        </div>
    )
}

export default MemeModal;