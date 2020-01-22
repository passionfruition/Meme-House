import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import logo from './logo.svg';
import '../App.css';
import MemeGrid from '../components/MemeGrid';
// import Navbar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import MemeModal from '../components/MemeModal';
import ZoomModal from '../components/ZoomModal';
import FakeFooter from '../components/FakeFooter';
import ScrollUpButton from "react-scroll-up-button";

// Style for Scroll Button 
const style = { padding: '3px', borderRadius: '50px', right: '3rem', bottom: '2rem', backgroundColor: 'red', outline: 0, zIndex: 20 };

// App 
function Home(props) {
    return (
        <div className="wrapper">
            <ScrollUpButton style={style} ToggledStyle={style} />
            <MemeModal toggleModal={props.toggleModal} />
            <ZoomModal toggleModal={props.toggleModal} clickedMemeId={props.clickedMemeId} clickedMemeUrl={props.clickedMemeUrl} clickedMemeLikes={props.clickedMemeLikes} likeMeme={props.likeMeme} />
            <div className="columns is-desktop is-centered">
                <div className="column is-2-desktop">
                    <div className="aside">
                        <Leaderboard memeLeaders={props.memeLeaders} showZoomedMeme={props.showZoomedMeme} />
                        <FakeFooter />
                    </div>
                </div>
                <div className="column is-7-desktop ">
                    <MemeGrid showZoomedMeme={props.showZoomedMeme} memeGallery={props.memeGallery} toggleModal={props.toggleModal}/>
                </div>
            </div>
        </div>
    );
}

export default Home;