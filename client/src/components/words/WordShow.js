import React from 'react';
import { connect } from 'react-redux'
// import {renderGoogle, renderOxford, renderImage, test} from './helper'
import './styles/ShowStyle.css';
import { translateEngExample, showEngMean, showEngExample, updateSaveMeaning , createGoogle, removeEngMean, ShowMyExample, UpdateMeaning, showImage } from '../../actions'
import Header from '../Header'
import GoogleSection from './GoogleSection'
import OxfordSection from './OxfordSection'
import BingSection from './BingSection'
import SaveSection from './SaveSection'
import GoogleImage from './GoogleImage'


class WordShow extends React.Component {

    renderMainpage = () => {
        if (!(Object.keys(this.props.showData.dict).length === 0)) {
            return (
                <div className = "mx-5 mt-4">
                    <div className="row">
                        <div className="google col-md-2 mt-3"><GoogleSection google={this.props.showData.dict.google}/></div>
                        <div key={'renderOxford'} className="oxford col-md-7" style={{lineHeight: 'normal'}}> <OxfordSection oxford={this.props.showData.dict.oxford}/> </div>
                        <div key={'renderBing'} className="col-md-3 border rounded mt-2"> <SaveSection save={this.props.showData} /></div>
                    </div>
                    <div className="row mt-2">
                        <div className="mt-3 col-md-8">
                            <BingSection bing={this.props.showData.dict.image}/>
                        </div>
                        <div className="mt-3 col-md-4">
                            <GoogleImage gooImage={this.props.showData.dict.gooImage}/>
                        </div>
                    </div>
                </div>
            );
            
        } else {
            return null
        }
    }
    render () {
        return (
            <div>
                <Header displaySignIn={true}/>
                {this.renderMainpage()}
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {showData: state}
}


export default connect(mapStateToProps, {translateEngExample, updateSaveMeaning,createGoogle,removeEngMean, showEngMean, showEngExample, ShowMyExample, UpdateMeaning, showImage})(WordShow);
