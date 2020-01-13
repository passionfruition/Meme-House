import React from "react";

function AddButton(props) {
    return (
        <button className="button is-success" id="add-meme" onClick={() => props.showModal("generator")}>
            <span className="icon">
            <i className="fas fa-pencil-alt"></i>
            </span>
            <span>Create Meme</span>
        </button>
    )
}

export default AddButton;