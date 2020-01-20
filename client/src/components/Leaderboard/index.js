import React from "react";
import "./style.css";

function Leaderboard(props) {
    return (
        <div className="box leaderboard-container">
            <h1 className="subtitle">King of the Memes</h1>
            <div className="leaderboard">
                <div className="scrolling-wrapper">
                    {!props.memeLeaders[0] ?
                        // If invalid search term, return try again message
                        <div><h1 className="subtitle ">Hmm.. No leaders yet</h1></div> :
                        // Else display leaders
                        props.memeLeaders.map(meme => (
                            <div className="lead-meme" key={meme._id}>
                                <img data-id={meme._id} src={meme.meme} data-url={meme.meme} key={meme._id} data-likes={meme.likes} onClick={(event) => props.showZoomedMeme(event)} alt="meme" className="lead-meme-img"></img>
                                {/* <span><i className="fas fa-thumbs-up"></i>{meme.likes}</span> */}
                        </div>))}
                </div>
            </div>
        </div>

    )
}
export default Leaderboard;