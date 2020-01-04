import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MemeGrid from '../src/components/MemeGrid';
import Navbar from '../src/components/Navbar';
import Leaderboard from '../src/components/Leaderboard';

function App() {
  return (
    <div>
      <Navbar/>
      <MemeGrid/>
      <Leaderboard/>
    </div>
  );
}

export default App;
