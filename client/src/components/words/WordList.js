import React from 'react';
import { connect} from 'react-redux';
import { fetchDictPerPage } from '../../actions'
import { postMyExample } from '../../actions'
import _ from 'lodash'
import './styles/ShowStyle.css';
import Pagination from './Pagination'
import Header from '../Header'
class WordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstRender: true,
            myExample:'',
            id : ''
        };
      }
    componentDidUpdate() {
        if(this.state.firstRender){
            if(this.props.currentUserId){
                this.props.fetchDictPerPage(this.props.currentUserId,1);
                this.setState({firstRender : null})
            }
        }
    }
    componentDidMount() {
        this.props.fetchDictPerPage(this.props.currentUserId,1);
    }
    playSound = (audio) => {
       const sound = new Audio(audio)
       sound.play();
    }
    
    handleExampleChange = (e, id) => {
        this.setState({myExample: e.target.value, id:id});
    }
    
    onFormSubmitExample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.postMyExample(this.state.myExample, this.state.id)
        this.setState({myExample: '', id: ''});
    }
    
    renderMyExample = (id) => {
        if(this.props.post.yex){
            return this.props.post.yex.map(eachExample => {
                if(eachExample._id === id){
                    return <p className="text-danger font-italic">"{eachExample.yex}"</p>
                }
            })
        }
    }
    
    renderMeaning(data, index) {
        return (
            <div className="row">
                <div className= "col-sm-8">
                    <p className="text-success h4 font-weight-bold text-capitalize">{index+1}. {data.word}</p>
                        <span onClick={e =>{this.playSound(data.aud)}}>
                            <audio src={data.aud}>
                            </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" width="20px" alt="speaker"/>
                        </span>
                    <span className="h5"> [{data.pro}]</span>
                    <div>
                    <p className="font-weight-bold h5 my-1 mt-2">{data.vi.map((eachVietMean, index) => {
                        if (index===0){
                            return <span key={`${eachVietMean}1`}> {eachVietMean}</span>
                        } else {
                            return <span key={eachVietMean}>, {eachVietMean}</span>
                        }
                    })}</p>
                    </div>
                    
                    
                    <form className="pt-2" onSubmit={this.onFormSubmitExample}>
                        <input onChange={e => this.handleExampleChange(e, data._id)} value={this.state.id === data._id ? this.state.myExample: ''} type="text" className="your-example mt-2" placeholder="Input your example here..."/>
                    </form>
                    
                    
                    
                    <hr/>
                    <div>
                        {this.renderMyExample(data._id)}
                    </div>
                    <div>
                        {
                            data.yex.map((eachExample, index) => {
                                        return <p key={eachExample} className="text text-danger font-italic">"{eachExample}"</p>
                            })
                        }
                    </div>
                    
                    <div>
                        {
                            data.ex.map((eachExample, index) => {
                                    return <p key={eachExample} className="text-muted font-italic">"{eachExample}"</p>
                            })
                        }
                    </div>
                    <div>{
                        data.en.map(eachMeaning => {
                            return (
                                <div key={eachMeaning.en}>
                                    <p className="text-primary"><span key={eachMeaning.cat}>({eachMeaning.cat})</span> {eachMeaning.en}</p>
                                </div>
                            );
                        } )
                    }</div>
                    
                </div>
                <div className="col-sm-4">
                    {
                        data.img.map(eachImage => {
                           return <img key={eachImage} src={eachImage} style={{width:'95%'}}  className="d-inline fluid img-thumbnail" alt="seachImage"/>
                        })
                    }
                </div>
            </div>
        );
    }
    renderList() {
        return this.props.dicts.map((dict,index) => {
            if(dict.userId === this.props.currentUserId){
            return (
              <div key={index} className="border rounded pl-3 mt-3 py-2 border-secondary showMeaning">
                        {this.renderMeaning(dict, index)}
              </div>  
            )};
            return <div></div>
        })
    }
    
    render() {
        console.log("this.props.dicts", this.props.dicts)
        if(this.props.dicts.length > 3){
        return (
            <div key={'container'} className="container">
                    <h1 key={'What you have learn so far'} className="mt-5 mb-4 pb-5 text-primary" style={{fontFamily: 'Coiny, cursive'}}><u>{this.props.currentUserId ? 'What you have learned so far:': null}</u></h1>
                    <Pagination/>
                    <div key={'renderList'}  className="mb-2">
                        {this.renderList()}
                    </div>
                    <div className="float-right mb-5">
                        <Pagination/>
                    </div>
                    
            </div>
            );
        } else {
            return null
        }
    }
}
    

const mapStateToProps = (state) => {
    
    return {
        dicts: Object.values(state.user),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        post: state.post
    }
}


export default connect(mapStateToProps,{fetchDictPerPage, postMyExample})(WordList);