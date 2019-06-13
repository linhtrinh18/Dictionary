import React from 'react';

import {showImage} from '../../actions'
import { connect } from 'react-redux'

class BingSection extends React.Component {
    constructor(props) {
        super(props)
        this.vietMeaning = [];
        this.engMeaning = [];
        this.engExample = [];
        this.myExample = [];
        this.image = [];
        this.state = {
            myExample:'',
            engMeanCheckBox: false,
            opacity: 0,
            index: null,
            def : null,
            display: 'none',
            img:null,
            trans:null,
            translate:[]
        }
    }

    
    renderImage = (bing) => {
        if(bing) {
                return bing.map((eachimage,index) => {
                    return (
                        <div key={index} className="image-border" onClick={e => this.selectImage(eachimage[0])}>
                            <img src={eachimage[0]} className={this.state.img === eachimage[0] ? 'image-display bother-thick' : 'image-display'} alt="from-bing"/>
                        </div>                
                    );
                })
        } else {
            return null
        }
    }

    selectImage = (eachimage) => {
        this.setState({img: eachimage})
        this.props.showImage(eachimage)
    }



    render() {
        return (
            <div>
                {this.props.bing ? <h5>Bing Image Search</h5> : null}
                <div className="border-right">
                    <section>
                        {this.renderImage(this.props.bing)}
                    </section>
                </div>
            </div>
        ); 
    }
}


export default connect(null, { showImage })(BingSection)