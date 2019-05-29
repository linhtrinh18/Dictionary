import React from 'react';
import { connect } from 'react-redux'
import {renderGoogle, renderOxford} from './helper'

class WordShow extends React.Component {
    render() {
        if (!(Object.keys(this.props.showData.dict).length === 0)) {
            return (
                <div className = "mx-5 mt-4">
                    <div className="row">
                        <div className="google col-md-3 mt-3"> {renderGoogle(this.props.showData.dict.google)}</div>
                        <div className="oxford col-md-5"> {renderOxford(this.props.showData.dict.oxford)} </div>
                        <div className="border rounded col-md-4 mt-3"> Three</div>
                    </div>
                </div>
            );
            
        } else {
            return <div></div>
        }
    }
    
}

const mapStateToProps = (state) => {
    console.log("ShowState: ",  state)
    return {showData: state}
}


export default connect(mapStateToProps)(WordShow);