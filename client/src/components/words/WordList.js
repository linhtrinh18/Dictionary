import React from 'react';
import { connect} from 'react-redux';
import { fetchDicts } from '../../actions'
import _ from 'lodash'
import './styles/ShowStyle.css';

class WordList extends React.Component {

    componentDidUpdate(prevProps, prevState){
        if(!_.isEqual(prevProps, this.props)) {
            this.props.fetchDicts(this.props.currentUserId);
        }
    }
    
    componentDidMount (prevProps, prevState) {
        if(!_.isEqual(prevProps, this.props)) {
            this.props.fetchDicts(this.props.currentUserId);
        }
    }
    
    renderMeaning(data) {
        console.log("DATA", data)
        return (
            <div className="row">
                <div className= "col-sm-8">
                    <p className="text-success h4 font-weight-bold text-capitalize">{data.word}</p>
                    <a class="headwordAudio rsbtn_play" onclick="this.firstElementChild.play();" data-behaviour="ga-event" data-value="Pronunciation audio">
                        <audio src={data.aud}>
                        </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" width="20px"/>
                    </a>
                    <span className="h5"> [{data.pro}]</span>     
                    <p className="font-weight-bold h5 my-1 mt-2">{data.vi}</p>
                    <input type="text" className="your-example mt-2" data="5cf0edd27cd89b2ae1a25e1d" placeholder="Your example here..."/>
                    <hr/>
                    <div>{
                        data.en.map(eachMeaning => {
                            return (
                                <div>
                                    <p className="text-primary"><span className ="font-weight-bold">({eachMeaning.cat})</span> {eachMeaning.en}</p>
                                </div>
                            );
                        } )
                    }</div>
                    
                </div>
                <div className="col-sm-4">
                    {
                        data.img.map(eachImage => {
                           return <img src={eachImage} style={{width:'95%'}}  className="d-inline fluid img-thumbnail"/>
                        })
                    }
                    
                </div>
            </div>
        );
    }
    
    
    renderList() {
        return this.props.dicts.map(dict => {
            if(dict.userId === this.props.currentUserId){
            return (
              <div className="border rounded pl-3 mt-3 py-2 border-secondary showMeaning">
                        {this.renderMeaning(dict)}
              </div>  
            )};
            return <div></div>
        })
    }
    
    render() {
        // console.log("From main Render",this.props)
        return (
            <div className="container">
                <h2 className="mt-5"> What you have learned so far  </h2>
                <div className="mb-5">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}
    

const mapStateToProps = (state) => {
    // console.log("WorldList STATE" , state)
    return {
        dicts: Object.values(state.user),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}


export default connect(mapStateToProps,{fetchDicts})(WordList);