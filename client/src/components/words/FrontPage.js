import React from 'react'
import './styles/FrontPage.css'
import GoogleAuth from '../GoogleAuth'
import Header from '../Header'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {createGoogle} from '../../actions'


class FrontPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            signIn: false
        };
    }
    
    onSubmit = (formValues) => {
        this.props.createGoogle(formValues)
    }
    
    renderInput = ({input, label, meta}) => {
        return (
            <div>
                <input {...input} className="form-control mr-sm-2 d-25" type="text" placeholder="Search" aria-label="Search" name="word" autoFocus/>
                <button className="btn btn btn-primary my-sm-0" type="submit">Search</button>
            </div>
        );
    }
    
    renderGoogleAuthButton = () => {
        if(!this.props.isSignedIn){
            return <GoogleAuth className="btn-lg" displaySignIn={true} />
        } else {
            return (
                <div>
                    <h5>What are you looking for: </h5>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-inline" name="word" autoComplete="off">
                        <Field name="word" component={this.renderInput} />
                    </form>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="fontpage">
                <Header displaySignIn={this.props.isSignedIn}/>
                <div class="jumbotron container mt-2">
                  <h1 class="display-4">English Dictionary</h1>
                  <p class="lead">This is a new way to learn and have fun with English Dictionary. Everything you need are in just one place and only one click.</p>
                  <div className="mt-4">
                    {this.renderGoogleAuthButton()}
                  </div>
                </div>
            </div>
        );
    }
    
}


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}


const formWrapped = reduxForm({
    form: 'firstCreate'
})(FrontPage);

export default connect(mapStateToProps,{createGoogle})(formWrapped)