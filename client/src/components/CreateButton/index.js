import React from "react";

function CreateButton(props) {
    if (window.location.pathname !== '/home') {
        return (
            <button className="button has-background-success has-text-white-bis" data-tip="Create a Meme" id="add-meme" onClick={() => props.toggleModal("generator")} disabled>
                <span className="icon">
                <i className="fas fa-pencil-alt"></i>
                </span>
            </button>
        )
    } else {
        return (
            <button className="button has-background-success has-text-white-bis" data-tip="Create a Meme" id="add-meme" onClick={() => props.toggleModal("generator")} >
                <span className="icon">
                <i className="fas fa-pencil-alt"></i>
                </span>
            </button>
        )
    }
}

export default CreateButton;