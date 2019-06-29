import React from 'react'
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
                <div className="form-group row text-center d-flex justify-content-center mt-3">
                    <div className="col-sm-5">
                    <input {...input} className="form-control" type="text" placeholder="Search..." name="word" autoFocus/>
                    </div>
                </div>
        );
    }
    
    renderGoogleAuthButton = () => {
        if(!this.props.isSignedIn){
            return (
                <div>
                    <h5 className="mt-4">Let's build your vocabulary </h5>
                    <GoogleAuth className="btn-lg" displaySignIn={true} size='btn-lg'/>
                </div>
                );   
        } else {
            return (
                <div>
                    <h5 className="mt-4 introduction"> What are you looking for: </h5>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="text-center" autoComplete="off">
                            <Field name="word" component={this.renderInput} />
                        </form>
                </div>
            );
        }
    }
    
    renderInputFeature = ({input}) => {
        return (
            <div className='row'>
                <div className="ml-2 d-none d-md-flex input-group w-50 col-sm-6 mx-auto mt-3">
                     <input {...input} className="form-control" type="text" placeholder="Try with 'hope'.."/>
                        <div className="input-group-append">
                        <span className="input-group-text search-box bg-success" id="search-icon">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    render () {
        return (
            <div>
                <Header displaySignIn={this.props.isSignedIn}/>
                <div className="container-fluid ">
                    <div className="row max-height justify-content-center pt-4">
                        <div className="col-10 mx-auto banner text-center">
                            <h1 className="text-capitalize introduction">welcome to <strong className="banner-title introduction">My Ditionary</strong></h1>
                            {this.renderGoogleAuthButton()}
                        </div>
                    </div>
             </div>
            {/* ---------------About Section-------------------- */}
            <section className="about py-5" id="about">
                <div className="container">
                    <div className='row'>
                        <div className="col-10 mx-auto col-md-6 my-5 introduction">
                            <h3 className="text-capitalize">about <strong className="about-banner-title text-secondary">my dictionary</strong></h3>
                            <p className="my-4 text-muted w-75">
                                My Dictionary is a visual way to learn volcabulary, we build up the enviroment where you can find a new experience in learning Volcabulary, playing around with FlashCard and train your long-term memory muscle. Learning and have fun!
                            </p>
                            <button className="btn btn-outline-secondary text-uppercase">explore</button>
                        </div>
                        <div className="col-10 mx-auto col-md-6 my-5 align-self-center">
                            <div className="about-img">    
                                <img src={ require('./styles/about-pic.jpg') } className="img-fluid" alt="about-sections"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ---------------Feature Section-------------------- */}
            <section id="feature">
                <div className="container my-4 introduction">
                    <div className="row">
                        <div className="col-10 mx-auto col-sm-6 text-center">
                            <h1 className="text-capitalize introduction">how <strong className="feature-banner-title">MyDicts work</strong></h1>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-lg-8 mx-auto d-flex justify-content-around  flex-wrap">
                          <button className="btn btn-black text-uppercase fliter-btn m-2" data-filter="all">Vietnamese</button>
                          <button className="btn btn-black text-uppercase fliter-btn m-2" data-filter="all">Flashcard</button>
                          <button className="btn btn-black text-uppercase fliter-btn m-2" data-filter="all">Oxford</button>
                          <button className="btn btn-black text-uppercase fliter-btn m-2" data-filter="all">Google Image</button>
                          <button className="btn btn-black text-uppercase fliter-btn m-2" data-filter="all">Bing Image</button>
                        </div>
                     </div>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="text-center" autoComplete="off">
                        <Field name="word" component={this.renderInputFeature}/>
                    </form>
                    
                    <div className="row feature-items" id="feature-items d-flex align-items-stretch">
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img src={require('./styles/save1.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-text text-center text-capitalize">
                                        <h5 id="feature-image-name">Save Vietnamese Meaning</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3 d-flex align-items-stretch">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img  src={require('./styles/save2.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-text text-center text-capitalize">
                                        <h5 id="feature-image-name d-flex align-items-baseline">English meaning</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3 d-flex align-items-stretch">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img src={require('./styles/save3.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-text text-center text-capitalize">
                                        <h5 id="feature-image-name">Save and Translate</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3 ">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img src={require('./styles/save4.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-text text-center text-capitalize">
                                        <h5 id="feature-image-name">Saving Image to FlashCard</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img src={require('./styles/save5.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-text text-center text-capitalize">
                                        <h5 id="feature-image-name">Your FlashCard</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-lg-4 mx-auto my-3">
                            <div className="card single-item">
                                <div className="img-container">
                                    <img src={require('./styles/save6.jpg')} class="card-img-top feature-image" alt="each-feature"/>
                                    <span className="feature-img-icon">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <div className="card-body">
                                    <hr/>
                                    <div className="card-tex text-center text-capitalize">
                                        <h5 id="feature-image-name">Save your FlashCard</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                
                </div>
            </section>
            
            {/* ---------------Benefit Section-------------------- */}
            <section className="benefits py-5 introduction" id="benefits">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center my-3">
                            <img src={require('./styles/idea.png')}  alt="memory"/>
                            <h6 className="text-uppercase my-3 benefit-title">Learning by context</h6>
                            <p className="w-75 mx-auto text-left benefit-text text-center"> Adding the context help you increase 50% capbability of remember of the word you're searching</p>
                        </div>
                        
                        <div className="col-md-4 text-center my-3">
                            <img src={require('./styles/image-benefit.png')}  alt="memory"/>
                            <h6 className="text-uppercase my-3 benefit-title">Visualize image</h6>
                            <p className="w-75 mx-auto text-left benefit-text text-center">You can easyily forget the word, but don't worry! Select the relevant image helping you increase 50% of retaining the information </p>
                        </div>
                        <div className="col-md-4 text-center my-3">
                            <img src={require('./styles/list.png')}  alt="memory"/>
                            <h6 className="text-uppercase my-3 benefit-title">Learning with FlashCard</h6>
                            <p className="w-75 mx-auto text-left benefit-text text-center">Review the word with historical search, Learning and have fun with your FlashCard and game </p>
                        </div>
                    </div>
                </div>
            </section>
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