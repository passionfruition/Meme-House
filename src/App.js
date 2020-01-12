import React, { Component } from 'react';
// import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MemeGrid from '../src/components/MemeGrid/index';
import Navbar from '../src/components/Navbar/index';
import Leaderboard from '../src/components/Leaderboard/index';
import MemeModal from '../src/components/MemeModal/index';
import ZoomModal from '../src/components/ZoomModal/index';
import axios from "axios";

class App extends Component {
  state = {
    zoomModal: "",
    generatorModal: "",
    leaderModal: "",
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
            <a className="button"><i className="fas fa-thumbs-up"></i></a>
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
          <div>
            <i className="fas fa-crown"></i>
            <span>{i + 1}</span>
          </div>
        </div>
      )
    }
    return leaders;
  }

  showModal = (modal) => {
    switch(modal) {
      case "zoom":
        this.setState({ zoomModal: "is-active" });
        break;
      case "generator":
        this.setState({ generatorModal: "is-active" });
        break;
      case "leader":
        this.setState({leaderModal : "is-active"})
        break;
    }
  }

  hideModal = (modal) => {
    switch(modal) {
      case "zoom":
        this.setState({ zoomModal: "" });
        break;
      case "generator":
        this.setState({ generatorModal: "" });
        break;
      case "leader":
        this.setState({leaderModal : ""})
        break;
    }
  }

  displayLikeOnHover = () => {
    this.setState({ hovered: true });
  }

  // Meme Generator //

  render() {
    return (
      <div className="wrapper">
        <MemeModal attribute={this.state.generatorModal} hideModal={this.hideModal} />
        <ZoomModal attribute={this.state.zoomModal} hideModal={this.hideModal} memeClicked={this.state.memeClicked} />
        <Leaderboard displayLeaders={this.displayLeaders} attribute={this.state.leaderModal} hideModal={this.hideModal} />
        <Navbar showModal={this.showModal} displayLeaders={this.displayLeaders} />

        <div className="columns is-centered">
          <div className="column is-9">
            <MemeGrid createGrid={this.createGrid} hovered={this.state.hovered} />
          </div>
          {/* <div className="column is-2">
            <Leaderboard displayLeaders={this.displayLeaders} />
          </div>  */}
        </div>
      </div>
    );
  }
}

export default App;
