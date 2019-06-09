import React from 'react'
import './styles/FrontPage.css'
import GoogleAuth from '../GoogleAuth'
import image from './styles/picture.jpg'




class FrontPage extends React.Component {
    render() {
        return (
            <div className="fontpage">
                <div class="jumbotron container mt-5">
                  <h1 class="display-4">English Dictionary</h1>
                  <p class="lead">This is a revolution way to learn and have fun with English by using Dictionary. Everything you need in just one place and one click.</p>
                  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                  <p class="lead">
                        <GoogleAuth  />
                  </p>
                </div>
            </div>
        );
    }
    
}

export default FrontPage