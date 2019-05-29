import React from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchDicts } from '../../actions'
import _ from 'lodash'


class WordList extends React.Component {
    componentDidMount() {
        // this.props.fetchDicts();
        // console.log("debug",this.props)
    }
    
    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log("shouldComponentUpdate",nextProps)
    //     if(nextProps.isSignedIn === true){
    //         return true;
    //     }
    //     return false
    // }
    // componentWillUpdate () {
    //     console.log("componentWillUpdate", this.props)
    // }
    
    componentDidUpdate(prevProps, prevState){
        // console.log("prevState",prevState)
        // console.log("prevProps",prevProps)
        // console.log("this.props",this.props)
        // console.log("prevProps !== this.props",prevProps !== this.props)
        // console.log(_.isEqual(prevProps, this.props))
        if(!_.isEqual(prevProps, this.props)) {
            this.props.fetchDicts(this.props.currentUserId);
            // console.log(_.isEqual(prevProps, this.props))
        }
    }
    
    // componentWillMount(prevProps, prevState){
    //     console.log("componentWillMount", this.props)
    //     this.props.fetchDicts(this.props.currentUserId);
    // }
    
    
    // //Fetch individual Dict from current User
    // fetchDictsFromCurrentUserClick = () => {
        
    // }
    
    renderList() {
        return this.props.dicts.map(dict => {
            // console.log("hey", dict)
            if(dict.userId === this.props.currentUserId){
            return (
              <div className="item" key={dict._id}>
              {this.renderAdmin(dict)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                    {dict.word}
                </div>
              </div>  
            )};
            return <div></div>
        })
    }
    
    renderAdmin = (dict) => {
        if(dict.userId === this.props.currentUserId){
            return (<div className='right floated content'> 
                        <Link to={`/words/edit/${dict._id}`} className="ui button primary">Edit</Link>
                        <button className="ui button negative">
                            Delete
                        </button>
                    </div>
            );
        }
    }
    
    renderCreate() {
        if (this.props.isSignedIn){
            return(
                <div style={{ textAlign: 'right'}}>
                    <Link to='/words/new' className="ui button primary">
                        Search for word
                    </Link>
                </div>
            );
        }
    }
    
    
    render() {
        // console.log("From main Render",this.props)
        return (
            <div>
                <h2>Your History </h2>
                <div className="ui cell list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
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