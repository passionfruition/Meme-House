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
    leaderModal: "",
    // Initializing state for Meme DB - GC
    memeArray: [],
    meme: null,
    memeGallery: [],
    clickedMemeUrl: "",
    clickedMemeId: ""
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
    axios.get('http://localhost:3001/memes/')
    .then((res) => this.setState({ memeGallery: res.data}))
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
          <img alt="meme" src="" onClick={() => this.showModal("zoom")}></img>
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
          <img src="" alt="meme"></img>
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

  likeMeme = () => {
    var thisId = this.attr("data-id");
    console.log(thisId);
  }

  showZoomedMeme = (event) => {
    // console.log("event target: " + event.target.dataset['id']);
    // console.log("event target: " + event.target.dataset['url']);
    this.setState({clickedMemeUrl: event.target.dataset['url'], clickedMemeId: event.target.dataset['id']})

    this.showModal("zoom");
  }

  // Meme Generator //

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'traphouse', upload_preset: 'memehouse', tags:['meme']},
    function(error, result) {
      console.log('************* uploading... *************')
        if (result.event === "success") {
          console.log(`Success! added to your Database -- ${result.info.url}`)
          axios.post('/api/putData', {
            meme: result.info.url
          })
          .then((result) => {
           let newMeme = result.config.data; 
            let tempArray = [];
            tempArray.push(newMeme);
            this.setState({ memeArray: tempArray });
          })
          .then(() => {
            this.getDataFromDB();
          })
          .catch((err) => {
            if(err) throw err;
          });
        }
    }.bind(this));
    
  }



  render() {
    return (
 <div className="wrapper">
            <div className="upload">
                <button onClick={this.uploadWidget} className="upload-button">
                    Add Image
                </button>
            </div>
        <MemeModal attribute={this.state.generatorModal} hideModal={this.hideModal} />
        <ZoomModal attribute={this.state.zoomModal} hideModal={this.hideModal} clickedMemeId={this.state.clickedMemeId} clickedMemeUrl={this.state.clickedMemeUrl}/>
        <Leaderboard displayLeaders={this.displayLeaders} attribute={this.state.leaderModal} hideModal={this.hideModal}/>
        <Navbar showModal={this.showModal} />
        <MemeGrid showZoomedMeme={this.showZoomedMeme} memeGallery={this.state.memeGallery} createGrid={this.createGrid} showModal={this.showModal} hovered={this.state.hovered}/>
      </div>
    );
  }
}

export default App;