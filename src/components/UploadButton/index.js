import React from 'react';

function UploadButton(props) {
    return (
        <button className="button" onClick={props.uploadWidget}>
            <span className="icon">
                <i className="fas fa-upload"></i>
            </span>
        </button>
    )
}

export default UploadButton;