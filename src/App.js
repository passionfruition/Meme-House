import React, { Component } from 'react';
// import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MemeGrid from '../src/components/MemeGrid';
import Navbar from '../src/components/Navbar';
import Leaderboard from '../src/components/Leaderboard';
import MemeModal from '../src/components/MemeModal';
import ZoomModal from '../src/components/ZoomModal';

class App extends Component {
  state = {
    zoomModal: "",
    generatorModal: "",
    hovered: false,
    memeClicked: "https://picsum.photos/800/400"
  }

  componentDidMount() {
    // Bulma mobile toggle
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  createGrid = () => {
    let grid = [];
    for (let i = 0; i < 16; i++) {
      grid.push(
        <div className="meme" key={i}>
          <img alt="meme" src="https://picsum.photos/300/300" onClick={() => this.showModal("zoom")}></img>
          <div className="like-button">
          <a className="button"><i class="fas fa-thumbs-up"></i></a>
          </div>
          
        </div>);
    }
    return grid;
  }

  displayLeaders = () => {
    let leaders = [];
    for (let i = 0; i < 3; i++) {
      leaders.push(
        <div className="lead-meme" key={i}>
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

  showModal = (modal) => {
    if (modal === "zoom") {
      this.setState({ zoomModal: "is-active" });
    } else {
      this.setState({ generatorModal: "is-active" });
    }
  }

  hideModal = (modal) => {
    if (modal === "zoom") {
      this.setState({ zoomModal: "" });
    } else {
      this.setState({ generatorModal: "" });
    }
  }

  displayLikeOnHover = () => {
    this.setState({ hovered: true});
  }

  // Meme Generator //

  render() {
    return (
      <div className="wrapper">
        <MemeModal attribute={this.state.generatorModal} hideModal={this.hideModal} />
        <ZoomModal attribute={this.state.zoomModal} hideModal={this.hideModal} memeClicked={this.state.memeClicked}/>
        <Navbar showModal={this.showModal} />
        <Leaderboard displayLeaders={this.displayLeaders}/>
        <MemeGrid createGrid={this.createGrid} hovered={this.state.hovered}/>
      </div>
    );
  }
}

export default App;
