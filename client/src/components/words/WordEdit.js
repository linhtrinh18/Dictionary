import React from 'react';
import { connect } from 'react-redux';
import { fetchDict } from '../../actions'


class WordEdit extends React.Component {
    
    // Insert with User ID as well
    componentDidMount(){
        // console.log("componentDidMount",this.props.match.params.id)
        this.props.fetchDict(this.props.match.params.id);
    }
    
    
    // console.log("props on Word edit", props)
    render () {
        console.log(this.props)
        if(!this.props.dict){
            return <div>LOADING.....</div>
        }
        return <div>{this.props.dict.word}</div>
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {dict: state.dict[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchDict})(WordEdit);