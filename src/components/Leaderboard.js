import React, { Component } from "react";

class Leaderboard extends Component {
    displayLeaders = () => {
        let leaders = [];
        for(let i = 0; i < 3; i ++) {
            leaders.push(
                <div className="lead-meme">
                <img src="https://picsum.photos/300/300" alt="meme"></img>
                <span>
                <i className="fas fa-crown"></i>
                <h1>{i + 1}</h1>
                </span>
                </div>
            )
        }
        return leaders;
    }

    render() {
        return (
            <div className="leaderboard-wrapper">
                <h1 className="subtitle">Top Memes</h1>
                {this.displayLeaders()}
            </div>
        )
    }
}

export default Leaderboard;