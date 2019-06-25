import React from 'react';
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux';
import { createGoogle } from '../actions';
import { createBing } from '../actions';
import { UpdateMeaning } from '../actions';
import { Navbar, Nav , Form} from 'react-bootstrap'



class Header extends React.Component {

    onSubmit = (formValues) => {
        this.props.clearSubmit()
        this.props.UpdateMeaning()
        this.props.createGoogle(formValues)
    }

    renderInput = ({input, label, meta}) => {
        return (
            <div className="ml-2 d-none d-md-flex input-group">
                 <input {...input} className="form-control" type="text" placeholder="Search.."  autoFocus/>
                    <div className="input-group-append">
                    <span className="input-group-text search-box bg-success" id="search-icon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        );
    }


    render() {
        return (
            <div>
                <Navbar bg="primary" expand="md" variant="dark" fixed="top">
                        <Link to="/" className="navbar-brand ml-lg-4">
                            <img style={{width:'35px'}} src={require('./words/styles/books.svg')} alt="logo"/>
                            <span className="ml-2"> Dictionary</span>
                        </Link>
                    <Nav>
                        <Link to="/review" className="nav-link">
                         Review
                        </Link>
                    </Nav>
                    <Nav>
                        <Link to="/" className="nav-link">
                         FlashCard
                        </Link>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
                          <Field name="word" component={this.renderInput} />
                        </Form>
                        <div className='ml-auto'>
                            <GoogleAuth displaySignIn={this.props.displaySignIn} />
                        </div>
                  </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('wordCreate'));

const formWrapped = reduxForm({
    form: 'wordCreate',
    onSubmitSuccess: afterSubmit
})(Header);


const mapStateToProps = (state) => {
    return {oxford: state.dict}
}



export default connect(mapStateToProps, {createGoogle, createBing, UpdateMeaning})(formWrapped)