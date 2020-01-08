import React from "react";
import MemeGenerator from '../components/MemeGenerator';

function MemeModal(props) {
    return (
        <div className={"modal " + props.attribute}>
            <div className="modal-background"></div>
            <div className="modal-content has-background-white">
                <MemeGenerator />
            </div>
            <button className="modal-close is-large" onClick={props.hideModal} aria-label="close"></button>
        </div>
    )
}

export default MemeModal;