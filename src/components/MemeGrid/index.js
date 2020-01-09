import React from 'react';

function MemeGrid(props) {
    return (
        <div className="meme-wrapper">
            {props.createGrid()}
        </div>
    )
}

export default MemeGrid;