import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createDict } from '../../actions';


class WordCreate extends React.Component {
    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className = "ui error message">
                    <div className="header">{error}</div>
                </div>
            
            );
        }
    }
    
    renderInput = ({input, label, meta}) => {
        // console.log(meta)
        return (
            <div>
                <div className="form-inline mt-2">
                    <input {...input} placeholder="type here" class="form-control w-25" autofocus autocomplete="off"/>
                    <button className="btn btn-success ml-2">Search</button>
                </div>
                {this.renderError(meta)}
            </div>
        );
    }
    
    
    onSubmit = (formValues) => {
        this.props.createDict(formValues)
    }
    
    render() {
        return (
            <div className="container pb-2">
                <h1 class="mt-5">Looking for new words?</h1>
                <lead>That's great! Let's find out something interesting </lead>
                <div className="form-inline"></div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="word" component={this.renderInput} />
                </form>
            </div>
            );
    }
}


const validate = (formValues) => {
    const errors = {};
    if(!formValues.word) {
       errors.word = 'Enter the word'; 
    }
     return errors;
};


const formWrapped = reduxForm({
    form: 'wordCreate',
    validate: validate
})(WordCreate);


const mapStateToProps = (state) => {
    // console.log("CREATE STATE",state)
    return {oxford: state.dict}
}


export default connect(mapStateToProps, {createDict})(formWrapped)