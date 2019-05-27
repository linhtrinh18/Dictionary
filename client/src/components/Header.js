import React from 'react';
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                LinhMe
            </Link>
        <div className="right menu">
            <Link to='/' className="item">
                Your words
            </Link>
            <GoogleAuth />
        </div>
        </div>

    );
}


export default Header