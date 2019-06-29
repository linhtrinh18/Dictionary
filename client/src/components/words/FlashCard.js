import React from 'react';
import { connect} from 'react-redux';
import { fetchRandom } from '../../actions'
import './styles/ShowStyle.css';
import Header from '../Header'
class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.firstRender = true
        this.state = {
            myExample:'',
            id : ''
        };
    }
    
    componentDidUpdate() {
        if(this.props.currentUserId){
            if(this.firstRender){
                console.log("AAA", this.props.currentUserId)
                this.props.fetchRandom(this.props.currentUserId);
                this.firstRender = false
            }
        }
    }
    
    
    renderRandom = () =>{
            return <p className="introduction">Loading....</p>
        }
        
    
    render() {
        return (
          <div>
            <Header displaySignIn={true}/>
            {this.renderRandom()}
          </div>  
        );
    }
    
}
    

const mapStateToProps = (state) => {
    return {
        dicts: Object.values(state.user),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        post: state.postex
    }
}


export default connect(mapStateToProps,{fetchRandom})(FlashCard);