import React, { Component } from 'react';

class MemeGrid extends Component {
    createGrid = () => {
        let grid = [];
        for (let i = 0; i < 24; i++) {
            grid.push(<img alt="meme" key={i} src="https://www.placecage.com/200/300"></img>);
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