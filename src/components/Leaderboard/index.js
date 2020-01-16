import React from "react";
import "./style.css";

function Leaderboard(props) {
    return (
        <div className="box leaderboard-container">
            <h1 className="subtitle">Top Memes</h1>
            <div className="leaderboard">
                <div className="scrolling-wrapper">
                    {!props.memeLeaders[0] ?
                        // If invalid search term, return try again message
                        <div><h1 className="subtitle">Hmm.. No leaders yet</h1></div> :
                        // Else display leaders
                        props.memeLeaders.map(meme => (
                            <div className="lead-meme" key={meme._id}>
                                <img src={meme.meme} key={meme._id} alt="meme" className="lead-meme-img"></img>
                                <span><i className="fas fa-thumbs-up"></i>{meme.likes}</span>
                        </div>))}
                </div>
            </div>
        </div>

    )
}
export default Leaderboard;