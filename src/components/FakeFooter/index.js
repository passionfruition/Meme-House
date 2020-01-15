import React from 'react';
import './style.css';

function FakeFooter() {
    return(
        <div className='columns is-hidden-touch'>
            <div className='column fake-footer-text'>
                <a href="https://github.com/madeleineprak/Meme-House">GitHub</a>
                <br/>
                <p>© 2020 MEME HOUSE</p>
            </div>
        </div>
    )
}

export default FakeFooter;