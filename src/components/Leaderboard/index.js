import React from "react";
import "./style.css";

function Leaderboard(props) {
    return (
        <div className="box leaderboard">
            <h1>Top Memes</h1>
            <div className="scrolling-wrapper">
                {!props.memeLeaders[0] ?
                    // If invalid search term, return try again message
                    <div><h1 className="subtitle">Hmm.. No leaders yet</h1></div> :
                    // Else display leaders
                    props.memeLeaders.map(meme => (
                        <div className="lead-meme" key={meme._id}>
                        <img src={meme.meme} key={meme._id} alt="meme"></img>
                        <div>
                            <i className="fas fa-thumbs-up"></i>
                            <span>{meme.likes}</span>
                        </div>
                    </div>))}
            </div>
        </div>

    )
}
export default Leaderboard;