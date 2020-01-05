import React, { Component } from 'react';

class MemeGrid extends Component {
    createGrid = () => {
        let grid = [];
        for (let i = 0; i < 16; i++) {
            grid.push(
                <div className="meme" key={i}>
                    <img alt="meme" src="https://picsum.photos/300/300"></img>
                    <i className="fas fa-heart"></i>
                </div>);
        }
        return grid;
    }

    render() {
        return (
            <div className="meme-wrapper">
                {this.createGrid()}
            </div>
        )
    }
}

export default MemeGrid;