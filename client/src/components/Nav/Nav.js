import React from "react";
import { Link } from "react-router-dom";
import "../Nav/style.css"

function Nav(props) {
    return (
        <React.Fragment>
            <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://images.onlinelabels.com/images/clip-art/pitr/pitr_Home_icon.png" className="logo" alt="logo" width="28" height="28"></img>
                        <h1 className="title app-name">meme house</h1>
                    </a>
                    <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                {props.user ? loggedIn(props.logOut) : loggedOut()}
            </nav>
        </React.Fragment>
    );
}

function loggedOut() {
    return (
        <React.Fragment>
            <div className="navbar-start">
                <div className="navbar-item active">
                    <Link to="/home" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link to="/signup" className="button is-link">Sign Up</Link>
                        <Link to="/login" className="button is-link">Log In</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function loggedIn(logOutFn) {
    return (
        <React.Fragment>
            <div className="navbar-start">
                <div className="navbar-item">
                    <Link to="/home" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </div>
                <div className="navbar-item">
                    <Link to="/members" className="nav-link">Members</Link>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <button className="button is-link" onClick={logOutFn} >Log Out</button>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Nav;