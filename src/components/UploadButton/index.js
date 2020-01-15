import React from 'react';

function UploadButton(props) {
    return (
        <button className="button has-background-link has-text-white-bis" data-tip="Upload a Meme" onClick={props.uploadWidget}>
            <span className="icon">
                <i className="fas fa-upload"></i>
            </span>
        </button>
    )
}

export default UploadButton;