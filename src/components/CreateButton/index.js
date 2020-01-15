import React from "react";

function CreateButton(props) {
    return (
        <button className="button is-success" id="add-meme" onClick={() => props.showModal("generator")}>
            <span className="icon">
            <i className="fas fa-pencil-alt"></i>
            </span>
        </button>
    )
}

export default CreateButton;