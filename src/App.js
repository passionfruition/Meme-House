import React, { Component } from 'react';
// import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';
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
    meme: null,
    data: null
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
    console.log("Try to get data from db")
    axios.get('http://localhost:3001/memes/')
      .then((res) => this.setState({ memeArray: res.data}))
    // .then(console.log(this.state.memeArray))
    // .then((res) => this.setState({ data: res.data })
    // ).then(console.log(this.state.data));
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
        if (err)
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
            <button className="button"><i className="fas fa-thumbs-up"></i></button>
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

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'traphouse', upload_preset: 'memehouse', tags: ['meme'] },
      function (error, result) {
        console.log('************* uploading... *************')
        if (result.event === "success") {
          console.log(`Success! added to your Database -- ${result.info.url}`)
          axios.post('/api/putData', {
            meme: result.info.url
          })
            .then((result) => {
              let newMeme = result.config.data;

              let tempArray = this.state.memeArray;
              tempArray.push(newMeme);
              this.setState({ memeArray: tempArray });
              console.log("meme array");
              console.log(this.state.memeArray);
            })
            .catch((err) => {
              if (err) throw err;
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
            <button onClick={() => this.getDataFromDB()} className="button">
              DB
            </button>
        </div>
        <MemeModal attribute={this.state.generatorModal} hideModal={this.hideModal} />
        <ZoomModal attribute={this.state.zoomModal} hideModal={this.hideModal} memeClicked={this.state.memeClicked} />
        <Leaderboard displayLeaders={this.displayLeaders} attribute={this.state.leaderModal} hideModal={this.hideModal} />
        <Navbar showModal={this.showModal} />
        <div className="columns is-centered">
          <div className="column is-10">
          <MemeGrid memeArray={this.state.memeArray} createGrid={this.createGrid} showModal={this.showModal} hovered={this.state.hovered} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;