import React from "react";

function Home(props) {
    return (
        <section className="hero">
            <div className="hero-body">
                <h1 className="title">Hello, {(props.user ? props.user.email : 'world')}!</h1>
                <p className="subtitle">This is our home page :)</p>
                <hr className="" />
                <p>It uses utility classNames for typography and spacing to space content out within the larger container.</p>
            </div>
        </section>
    );
}

export default Home;