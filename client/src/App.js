import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";

/* Import pages */
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Import components */
import Nav from "./components/Nav";

class App extends React.Component {
  state = {
    // Homepage
    memeArray: [],
    meme: null,
    memeGallery: [],
    memeLeaders: [],
    clickedMemeUrl: "",
    clickedMemeId: "",
    clickedMemeLikes: 0,

    // User auth
    user: null,
    isLoggedIn: false
  };

  componentDidMount() {
    //check to see if we're already logged in by asking the backend
    axios.get("/auth/whoami")
      .then(result => {
        this.setState({user: result.data })
      })
      .catch(err=> console.log(err));
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
        // console.log(result)
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

  logIn = user => { // user <--  result.data
    this.setState({ user: user, isLoggedIn: true }); //update our state to include result.data
    console.log(user.email);
    console.log(this.state.isLoggedIn);
  };

  logOut = () => {
    //Make sure we do an axios call to log out from the backend...then update the state!
    axios.get("/auth/logout")
      .then(result => this.setState({ user: null, isLoggedIn: false }))
      .then(console.log(this.state.isLoggedIn))
      .catch(err=> console.log(err));
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user} logOut={this.logOut} toggleModal={this.toggleModal} uploadWidget={this.uploadWidget}/>
        <Switch>
          <Route path="/home">
            <Home 
            user={this.state.user} 
            toggleModal={this.toggleModal}
            clickedMemeId={this.state.clickedMemeId}
            clickedMemeUrl={this.state.clickedMemeUrl}
            clickedMemeLikes={this.state.clickedMemeLikes}
            likeMeme={this.likeMeme}
            uploadWidget={this.uploadWidget}
            memeLeaders={this.state.memeLeaders}
            showZoomedMeme={this.showZoomedMeme}
            memeGallery={this.state.memeGallery}
            />
          </Route>

          <Route path="/members" render={() => (this.state.user !== null ? <Members user={this.state.user} onError={this.logOut} /> : <Redirect to="/login" />)} /> 

          <Route path="/login" render={() => (this.state.user !== null ? <Redirect to="/members" /> : <Login onSuccess={this.logIn} />)} />

          <Route path="/signup" render={() => (this.state.user !== null ? <Redirect to="/members" /> : <Signup onSuccess={this.logIn} />)} />

          <Redirect exact from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default App;
