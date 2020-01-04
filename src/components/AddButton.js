import React from "react";

function AddButton(props) {
    return (
        <button className="button is-primary" id="add-meme" onClick={props.showModal}>
            <span className="icon">
            <i className="fas fa-upload"></i>
            </span>
            <span>Add Meme</span>
        </button>
    )
}

export default AddButton;