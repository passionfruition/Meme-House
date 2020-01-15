import React from "react";

function CreateButton(props) {
    return (
        <button className="button" id="add-meme" onClick={() => props.toggleModal("generator")}>
            <span className="icon">
            <i className="fas fa-pencil-alt"></i>
            </span>
        </button>
    )
}

export default CreateButton;