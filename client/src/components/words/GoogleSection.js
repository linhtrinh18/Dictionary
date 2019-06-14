import React from 'react';

import {showExample} from '../../actions'
import { connect,createGoogle } from 'react-redux'

class GoogleSection extends React.Component {
    renderGoogle = (google) => {
        if(google) {
                if(google.sentences) {
                    return (
                            <div>
                                <p key={google.sentences[0].trans} className="font-weight-bold h1">{google.sentences[0].trans}</p>
                                <div>
                                    {this.renderGoogleElement(google.dict)}
                                </div>
                            </div>
                    );
                } else {
                    return (
                        <div>
                        <p className="text text-danger h3"> {google[1]} ?  </p>
                        <p className="text text-success h4 mt-3">Did you mean: </p>
                        <button onClick={e => this.onSubmitTheCorrectWord({word: google[0]})} className="btn btn-success btn-lg">{'>>'} {google[0]} </button>
                        </div>
                     );
                } 
            } else {
                return null
            }
    }
    renderGoogleElement = (dicts) => {
        if(dicts){
            return dicts.map((dict,index1) => {
                return (
                    <div key={index1}>
                        <p key={Math.floor(Math.random() * 1000)} className="text-uppercase text-success mt-2">{dict.pos}</p>
                        {dict.entry.map((vietMean,index) => {
                              return ( 
                                    <div key={index}>
                                        <div key={index} className="custom-control custom-checkbox" >
                                            <input key={`${vietMean.word}input`} type="checkbox" className="custom-control-input checkboxHide" id={vietMean.word} onClick={(e) => this.insertVietmean(vietMean.word)}/>
                                            <label key={`${vietMean.word}label`}className="custom-control-label font-weight-bold showCheckBox" htmlFor={vietMean.word}>{vietMean.word}</label>
                                        </div>
                                        <p key={`${vietMean.word}p`} className="pl-3 font-italic">"{vietMean.reverse_translation.map(each => {return `${each} `})}"</p>
                                    </div>
                              );
                        })}
                    </div>
                );
            })
        } else {
            return null
        }
    }
    insertVietmean = (vietMean) => {
        this.props.showExample(vietMean)
    }
    onSubmitTheCorrectWord = (formValues) => {
        this.props.createGoogle(formValues)
    }
    
    render() {
        return (
            <div>
                {this.renderGoogle(this.props.google)}
            </div>
        ); 
    }
}


export default connect(null, { showExample,createGoogle })(GoogleSection)