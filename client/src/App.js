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
import FakeFooter from '../src/components/FakeFooter';
import ScrollUpButton from "react-scroll-up-button";

// Style for Scroll Button 
const style = { padding: '3px', borderRadius: '50px', right: '3rem', bottom: '2rem' , backgroundColor: 'red', outline: 0, zIndex: 20};

// App 
class App extends Component {
  state = {
    // Initializing state for Meme DB - GC
    memeArray: [],
    meme: null,
    memeGallery: [],
    memeLeaders: [],
    clickedMemeUrl: "",
    clickedMemeId: "",
    clickedMemeLikes: 0,
  }

  componentDidMount() {
    // Getting Data from DB -GC
    this.getDataFromDB();
    this.getLeadersFromDB();
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
    axios.get('http://localhost:3001/api/memes/')
      .then((res) => this.setState({ memeGallery: res.data }))
  };

  getLeadersFromDB = () => {
    axios.get('http://localhost:3001/api/leaders/')
      .then((res) => this.setState({ memeLeaders: res.data }))
  }

  toggleModal = (modal) => {
      var element = document.getElementById(modal);
      element.classList.toggle("is-active");
  }

  likeMeme = () => {
    // Doesn't have a restriction on how many times a user can like a picture, need to implement
    let newLikes = parseInt(this.state.clickedMemeLikes) + 1
    axios.post('http://localhost:3001/updateData', {
      id: this.state.clickedMemeId,
      update: newLikes
    })
    .then((res) => console.log(res))
    .then(this.setState({ clickedMemeLikes: newLikes }))
    .then(this.getDataFromDB())
    .then(this.getLeadersFromDB())
  }

  showZoomedMeme = (event) => {
    this.setState({ clickedMemeUrl: event.target.dataset['url'], clickedMemeId: event.target.dataset['id'], clickedMemeLikes: event.target.dataset['likes'], date: event.target.dataset['createdAt'] })
    this.toggleModal("zoom");
  }

  // Cloudinary Upload Widget //
  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'traphouse', upload_preset: 'memehouse', tags: ['meme'] },
      function (error, result) {
        console.log('************* uploading... *************')
        console.log(result)
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
            .then(() => {
              this.getLeadersFromDB();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }.bind(this));
  }

  render() {
    return (
      <div className="wrapper">
        <ScrollUpButton style={style} ToggledStyle={style}/>
        <MemeModal toggleModal={this.toggleModal} />
        <ZoomModal toggleModal={this.toggleModal} clickedMemeId={this.state.clickedMemeId} clickedMemeUrl={this.state.clickedMemeUrl} clickedMemeLikes={this.state.clickedMemeLikes} likeMeme={this.likeMeme}/>
        <Navbar toggleModal={this.toggleModal} uploadWidget={this.uploadWidget} />
        <div className="columns is-desktop is-centered">
          <div className="column is-2-desktop">
            <div className="aside">
              <Leaderboard memeLeaders={this.state.memeLeaders} showZoomedMeme={this.showZoomedMeme}/>
              <FakeFooter />
            </div>
          </div>
          <div className="column is-7-desktop ">
            <MemeGrid  showZoomedMeme={this.showZoomedMeme} memeGallery={this.state.memeGallery} toggleModal={this.toggleModal} clickedMemeUrl={this.clickedMemeLikes}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;