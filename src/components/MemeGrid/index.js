import React from 'react';

function MemeGrid(props) {
    return (
        <div className="meme-wrapper">
            {!props.memeArray[0] ? 
          // If invalid search term, return try again message
          <h1 className="subtitle">Hmm.. Try a different time</h1> : 
          // Else display photo set
          props.memeArray.map(meme => (<div className="meme" key={meme._id}>
          <img alt="meme" src={meme.meme} onClick={() => props.showModal("zoom")}></img>
          <div className="like-button">
            <button className="button"><i className="fas fa-thumbs-up"></i></button>
          </div>

        </div>))}
        </div>
    )
}

export default MemeGrid;