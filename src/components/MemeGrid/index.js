import React from 'react';
import './style.css'

function MemeGrid(props) {
    return (
        <div className="meme-wrapper">
            {
            !props.memeGallery[0] ? 
          // If invalid search term, return try again message
          <div><h1 className="subtitle">Hmm.. Try a different time</h1><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p><p>69</p></div> : 
          // Else display photo set
          props.memeGallery.map(meme => (<div className="meme" key={meme._id}>
          <img alt="meme" data-id={meme._id} data-url={meme.meme} data-likes={meme.likes} src={meme.meme} onClick={(event) => props.showZoomedMeme(event)}></img>
          <div className="like-button">
            <button className="button"><i className="fas fa-thumbs-up"></i></button>
          </div>

        </div>))}
        {/* {props.createGrid()} */}
        </div>
    )
}

export default MemeGrid;