import React from 'react';

import {showImage} from '../../actions'
import { connect } from 'react-redux'

class GoogleImage extends React.Component {
    
    constructor(props) {
        super(props)
        this.vietMeaning = [];
        this.engMeaning = [];
        this.engExample = [];
        this.myExample = [];
        this.image = [];
        this.state = {
            img:null
        }
    }
    
    renderImage = (ggImage) => {
        if(ggImage) {
                return ggImage.map((eachimage,index) => {
                    return (
                        <div key={index} className="image-border" onClick={e => this.selectImage(eachimage)}>
                            <img src={eachimage} className={this.state.img === eachimage ? 'image-display bother-thick' : 'image-display'} alt="from-bing"/>
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
                {this.props.gooImage ? <h5>Google Image Search</h5> : null}
                <div>
                    <section>
                        {this.renderImage(this.props.gooImage)}
                    </section>
                </div>
            </div>
        ); 
    }
}


export default connect(null, { showImage })(GoogleImage)