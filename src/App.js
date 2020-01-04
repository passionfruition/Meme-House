import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MemeGrid from '../src/components/MemeGrid';
import Navbar from '../src/components/Navbar';
import Leaderboard from '../src/components/Leaderboard';
import AddButton from '../src/components/AddButton';
import MemeModal from '../src/components/MemeModal';

class App extends Component {
  state = {
    modal: ""
  }

  showModal = () => {
    this.setState({ modal: "is-active" });
  }

  hideModal = () => {
    this.setState({ modal: "" });
  }
  render() {
    return (
      <div>
        <MemeModal attribute={this.state.modal} hideModal={this.hideModal}/>
        <Navbar />
        <AddButton showModal={this.showModal}/>
        <Leaderboard />
        <MemeGrid />
      </div>
    );
  }
}

export default App;
