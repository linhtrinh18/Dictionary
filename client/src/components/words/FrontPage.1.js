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
                <div className="form-group mb-2">
                    <input {...input} className="form-control" type="text" placeholder="Search" name="word" autoFocus/>
                </div>
        );
    }
    
    renderGoogleAuthButton = () => {
        if(!this.props.isSignedIn){
            return (
                <div>
                    <h5>Login and get started </h5>
                    <GoogleAuth className="btn-lg" displaySignIn={true} />
                </div>
                );   
        } else {
            return (
                <div>
                    <h5>What are you looking for: </h5>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-inline" name="word" autoComplete="off">
                        <Field name="word" component={this.renderInput} />
                        <button className="btn btn-primary mb-2 ml-2" type="submit" style={{verticalAlign: 'top'}}>Search</button>
                    </form>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="fontpage pt-4">
                <Header displaySignIn={this.props.isSignedIn}/>
                <div className="container">
                    <div className="jumbotron mt-5">
                      <h1 className="display-4">English Dictionary</h1>
                      <p className="lead">A new way to learn and have fun with English Dictionary. Everything you need are in just one place and only one click.</p>
                      <div className="mt-4">
                        {this.renderGoogleAuthButton()}
                      </div>
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