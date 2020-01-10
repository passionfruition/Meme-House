import React, { Component } from 'react';
import axios from 'axios';
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
    memeClicked: "https://picsum.photos/800/400",
    // Initializing state for Meme DB - GC
    memeArray: [],
    id: 0,
    meme: null,
    idToDelete: null,
  }

  componentDidMount() {
    // Getting Data from DB -GC
    this.getDataFromDB();
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

  //get method that uses backend api to get data from DB - GC
  getDataFromDB = () => {
    fetch('/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data })
      ).then(console.log(this.state.data));
  };

  //put method that uses our backend api to create new entry/upload into DB - GC
  putMemeInDB = (memeUpload) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('/api/putData', {
      id: idToBeAdded,
      meme: memeUpload
    })
    .then((result) => {
     let newMeme = result.data.data 
      console.log(result.data.data)
      let tempArray = this.state.data;
      tempArray.push(newMeme);
      this.setState({ data: tempArray });
    })
    .catch((err) => {
      if(err) 
      console.log(err);
    });
  };

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
        <div>
          <ul>
          {this.state.memeArray.length <= 0
            ? 'NO MEMES YET'
            : this.state.memeArray.map((result) => (
                <li style={{ padding: '10px' }} key={result._id}>
                  <span style={{ color: 'gray' }}> id: </span> {result.id} <br />
                  <span style={{ color: 'gray' }}> data: </span> {result.meme}
                </li>
              ))}
          </ul>
          <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ meme: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putMemeInDB(this.state.meme)}>
            ADD
          </button>
        </div>
        </div>
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
