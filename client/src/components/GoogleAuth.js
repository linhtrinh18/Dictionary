import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, clearDict, clearUser, fetchDictPerPage } from '../actions'

class GoogleAuth extends React.Component {
    // state = { isSignedIn: null};
    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '460453499273-hfk4sctvo8rqrs204dppuf9uhvqk7mjj.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        })
    }
    
    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
            this.props.fetchDictPerPage(this.auth.currentUser.get().getId(),1)
        } else {
            this.props.signOut();
        }
    }
    
    
    onSignInClick = () => {
        this.auth.signIn();
    }
    
    onSignOutClick = () => {
        this.auth.signOut();
        this.props.clearDict();
        this.props.clearUser();
    }
    
    renderAuthButton () {
        if(this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="btn btn-danger">
                     <i className="fa fa-google"/>
                     <span> </span>Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="btn btn-danger">
                     <i className="fa fa-google" />
                     <span> </span>Sign In with Google
                </button>
            );
        }
    }
    
    render() {
        return <div>{this.renderAuthButton() }</div>
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return { isSignedIn: state.auth.isSignedIn}
}



export default connect(mapStateToProps, {fetchDictPerPage, clearUser, signIn, signOut, clearDict})(GoogleAuth);