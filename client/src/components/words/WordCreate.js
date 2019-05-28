import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createDict } from '../../actions';


class WordCreate extends React.Component {
    // renderInput (formProps) {
    //     return (
    //         <input   
    //             onChange = {formProps.input.onChange}
    //             value = {formProps.input.value}
    //         />
    //     );
    // }
    // renderInput (formProps) {
    //     return <input {...formProps.input}/>
    // }
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
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    
    
    onSubmit = (formValues) => {
        this.props.createDict(formValues)
    }
    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="word" component={this.renderInput} label="Enter Word" />
                <button className="ui button primary">Search</button>
            </form>
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
    console.log("CREATE STATE",state)
    return {oxford: state.dict}
}


export default connect(mapStateToProps, {createDict})(formWrapped)