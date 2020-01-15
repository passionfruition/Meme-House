import React from 'react';
import CreateButton from "../CreateButton";
import UploadButton from "../UploadButton";
import "../Navbar/style.css"
import LogInButton from '../LogInButton';

function Navbar(props) {
    return (
        <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="">
                    <img src="https://images.onlinelabels.com/images/clip-art/pitr/pitr_Home_icon.png" className="logo" alt="logo" width="28" height="28"></img>
                    <h1 className="title app-name">meme house</h1>
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasic" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <UploadButton uploadWidget={props.uploadWidget} />
                            <CreateButton toggleModal={props.toggleModal} />
                            <LogInButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;