import React from 'react';

import {showExample, ShowMyExample, removeEngMean, showImage, updateSaveMeaning} from '../../actions'
import { connect } from 'react-redux'

class SaveSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myExample:''
        }
    }
    
    renderSaveSection(data) {
        if(data.dict.data){
        return (
            <div>
                <form className="pt-2" onSubmit={this.onFormSubmitExample}>
                    <input onChange={this.handleExampleChange} value={this.state.myExample} type="text" className="your-example mt-2" placeholder="Input your example here..."/>
                </form>
                <hr/>
                <p className="display-4 d-inline">{data.dict.data.word}</p>
                <button onClick={e => this.onSaveExampleClick()} className="btn btn-primary d-inline float-right">Save</button>
                <div className="mt-2 text-success h4"><span>{this.renderFirstVietMeaning(data.dict)}</span>{this.renderShowVietMeaning(data.post)}</div>
                <hr/>
                <div>{this.renderShowMyExample(data.post)}</div>
                <div>{this.renderShowExample(data.post)}</div>
                <div>{this.renderShowEngMeaning(data.post)}</div>
                <div>{this.renderShowpImage(data.post)}</div>
            </div>)
        }
    }

    renderShowMyExample = (data) => {
        if(data.yex){
            return data.yex.map((eachExample,index) => {
                return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p key={eachExample} className="font-italic text-danger">"{eachExample}"</p></div>
                        <div className="text-danger"><button onClick={e => this.removeMyExample(eachExample)}className="btn btn-danger btn-xs">X</button></div>
                     </div>    
                );
            })
        }
        
    }


    renderShowExample = (data) => {
        if(data){
            if (data.ex){
                return data.ex.map((eachEngExample,index) => {
                    return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p className="font-italic text-danger">"{eachEngExample}"</p></div>
                        <div className="text-danger"><button onClick={e => this.insertEngExample(eachEngExample)} className="btn btn-danger btn-xs">X</button></div>
                     </div>  
                    );
                })
            }
        }
    }

    renderShowEngMeaning = (data) => {
        if(data.en) {
            return data.en.map((eachEngMean, index) => {
                return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p className="text-primary">{eachEngMean.en[0]}</p></div>
                        <div className="text-danger"><button onClick={e => this.removeEngmean(eachEngMean)} className="btn btn-danger btn-xs">X</button></div>
                     </div>  
                );
            })
        }
    }

    renderShowpImage = (data) => {
        let image = data.img
        if(image) {
            return image.map((eachimage,index) => {
                return (
                    <div key={index} className="image-border-icon d-inline mt-2" onClick={e => this.removeSaveImage(eachimage)}>
                        <img src={eachimage} key={eachimage} className='image-display-icon d-inline' alt="from-bing"/>
                    </div>                
                );
            })
        } else {
            return null
        }
    
    }
    
    renderFirstVietMeaning = (data) => {
        if(data.data) {
            return <span>{data.data.vi[0]}</span>
        }
    }
    
    renderShowVietMeaning = (data) => {
        if(data.vi) {
            return data.vi.map((eachVietMean,index) => {
                return <span key={index}>, {eachVietMean}</span>
                })
            }
    }

    onFormSubmitExample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.ShowMyExample(this.state.myExample)
        this.setState({myExample: ''});
    }
    handleExampleChange = (e) => {
        this.setState({myExample: e.target.value});
    }
    removeMyExample = (eachExample) => {
        this.props.ShowMyExample(eachExample)
    }

    removeEngmean = (eachEngMean) => {
        this.props.removeEngMean(eachEngMean)
    }

    removeSaveImage = (image) => {
        this.props.showImage(image)
    }
    onSaveExampleClick = () => {
        this.props.updateSaveMeaning()
    }



    render() {
        return (
            <div>
                {this.renderSaveSection(this.props.save)}
            </div>
        ); 
    }
}


export default connect(null, { showExample, ShowMyExample, removeEngMean, showImage, updateSaveMeaning })(SaveSection)