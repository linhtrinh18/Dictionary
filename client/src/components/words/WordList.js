import React from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchDicts } from '../../actions'


class WordList extends React.Component {
    componentDidMount() {
        this.props.fetchDicts();
    }
    
    renderList() {
        return this.props.dicts.map(dict => {
            // console.log("hey", dict)
            return (
              <div className="item" key={dict._id}>
              {this.renderAdmin(dict)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                    {dict.word}
                </div>
                
              </div>  
            );
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
        // console.log(this.props.dicts)
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
    // console.log("state ne" , state)
    return {
        dicts: Object.values(state.dict),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

 
export default connect(mapStateToProps,{fetchDicts})(WordList);