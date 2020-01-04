import React from "react";

function AddButton() {
    return (
        <button className="button is-primary" id="add-meme">
            <span className="icon">
            <i className="fas fa-upload"></i>
            </span>
            <span>Add Meme</span>
        </button>
    )
}

export default AddButton;