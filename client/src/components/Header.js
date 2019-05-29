import React from 'react';
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createDict } from '../actions';

class Header extends React.Component {
    
    onSubmit = (formValues) => {
        this.props.createDict(formValues)
    }
    
    renderInput = ({input, label, meta}) => {
        // console.log(meta)
        return (
            <div>
                <input {...input} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="word" autofocus/>
                <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </div>
        );
    }
    
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                  <Link to="/" className="navbar-brand">
                         Dictionary
                  </Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse nav-pills" id="myNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to="/words/new" className="nav-link">
                            New
                        </Link>
                      </li>
                    </ul>
                    
                    
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-inline ml-3" action="/dict" method="post" name="word" autocomplete="off">
                        <Field name="word" component={this.renderInput} />
                    </form>
                    
                    
                    <div className='ml-auto'>
                        <GoogleAuth  />
                    </div>
                  </div>
                </nav>
            </div>
        );
    }
}




const formWrapped = reduxForm({
    form: 'wordCreate'
})(Header);


const mapStateToProps = (state) => {
    // console.log("CREATE STATE",state)
    return {oxford: state.dict}
}


export default connect(mapStateToProps, {createDict})(formWrapped)