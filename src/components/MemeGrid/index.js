import React from 'react';
import './style.css'

function MemeGrid(props) {
    return (
        <div>
          <div className="meme-wrapper-header">
          </div>
          <div className="meme-wrapper">
              {
              !props.memeGallery[0] ? 
            // If invalid search term, return try again message
            <div><h1 className="subtitle">Hmm.. Try a different time</h1></div> : 
            // Else display photo set
            props.memeGallery.map(meme => (
              <div className="meme image is-square" key={meme._id}>
                <img alt="meme" data-id={meme._id} data-url={meme.meme} data-likes={meme.likes} src={meme.meme} onClick={(event) => props.showZoomedMeme(event)}></img>
                {/* <div className="overlay" data-id={meme._id} data-url={meme.meme} data-likes={meme.likes} src={meme.meme} onClick={(event) => props.showZoomedMeme(event)}> </div>*/}
                <div className="is-overlay" data-id={meme._id} data-url={meme.meme} data-likes={meme.likes} src={meme.meme} onClick={(event) => props.showZoomedMeme(event)}> 
                  <span className="has-text-white like-count is-unselectable" onClick={(event) => props.showZoomedMeme(event)}><i className="fas fa-crown"></i> {meme.likes}</span>
                </div>
              </div>
            ))}
          {/* {props.createGrid()} */}
          </div>
        </div>
    )
}

export default MemeGrid;