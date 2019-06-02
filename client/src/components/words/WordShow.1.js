import React from 'react';
import { connect } from 'react-redux'
import {renderGoogle, renderOxford, renderImage, test} from './helper'
import './styles/ShowStyle.css';

class WordShow extends React.Component {
    
    deleteRow = (e) => {
        console.log("EEEE", e)
    }
    
    render() {
        if (!(Object.keys(this.props.showData.dict).length === 0)) {
            return (
                <div className = "mx-5 mt-4">
                    <div className="row">
                        <div className="google col-md-2 mt-3"> {renderGoogle(this.props.showData.dict.google)}</div>
                        <div className="oxford col-md-7" style={{lineHeight: 'normal'}}> {renderOxford(this.props.showData.dict.oxford)} </div>
                        <div className="border rounded col-md-3 mt-3">SECTION 3</div>
                    </div>
                    
                    <section className="mt-3">
                            {renderImage(this.props.showData.dict.image)}
                    </section>
                    
                </div>
            );
            
        } else {
            return <div></div>
        }
    }
    
}

const mapStateToProps = (state) => {
    // console.log("ShowState: ",  state)
    return {showData: state}
}

export default connect(mapStateToProps)(WordShow);