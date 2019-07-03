import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { connect} from 'react-redux';
import { fetchRandom, deleteWord, postMyExample } from '../../actions'
import './styles/ShowStyle.css';
import Header from '../Header'
class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.firstRender = true
        this.myRandom = [];
        this.myOrder = 0;
        this.state = {
            myExample:'',
            id : '',
            isFlipped: false,
            orderNumber :0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
    
    
    componentDidUpdate() {
        if(this.props.currentUserId){
            if(this.firstRender){
                this.props.fetchRandom(this.props.currentUserId);
                this.firstRender = false
            }
        }
    }
    
    onFormSubmitExample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.postMyExample(this.state.myExample, this.state.id)
        this.setState({myExample: '', id: ''});
    }
    
    configOrder = async () => {
        if(this.state.orderNumber < this.props.rand.length - 1) {
            this.setState({orderNumber: this.state.orderNumber + 1})
        } else {
            await this.props.fetchRandom(this.props.currentUserId);
            this.setState({orderNumber: 0})
        }
        
    }

    renderRandomFront = (i) =>{
        if(this.props.rand.length >= 1) {
            return (
                    <div className="border rounded pt-2 pb-4 mb-4 text-center">
                        <h1 className="text-center py-2 introduction">{this.props.rand[this.state.orderNumber].word}</h1>
                        <span onClick={e =>{this.playSound(this.props.rand[this.state.orderNumber].aud)}}>
                            <audio src={this.props.rand[this.state.orderNumber].aud}>
                            </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" width="20px" alt="speaker"/>
                        </span>
                        <span className="h5"> [{this.props.rand[this.state.orderNumber].pro}]</span>
                    </div>
            );
        } else {
            return <p>Loading...</p>
        }
    }
    
    deleteWord = (id) => {
        this.props.deleteWord(id)
        if(this.state.orderNumber < this.props.rand.length - 1) {
            this.setState({orderNumber: this.state.orderNumber + 1})
        }
    }
    
    renderRandomBack = (i) => {
        if(this.props.rand.length >=1) {
            return (
                    <div className="border rounded pl-3 pt-2 pb-4 mb-4 border-secondary showMeaning">
                        <div className="row">
                            <div className="col-sm-8">
                                <span onClick={e => this.deleteWord(this.props.rand[this.state.orderNumber]._id)} className="float-right text-danger x-text pr-1">
                                <i  className="fa fa-trash" style={{ fontSize: '1.8rem'}}></i>
                                 </span>
                                <p className="text-success  h4 font-weight-bold text-capitalize"> {this.props.rand[this.state.orderNumber].word}</p>
                                <span onClick={e =>{this.playSound(this.props.rand[this.state.orderNumber].aud)}}>
                                    <audio src={this.props.rand[this.state.orderNumber].aud}>
                                    </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" width="20px" alt="speaker"/>
                                </span>
                                <span className="h5"> [{this.props.rand[this.state.orderNumber].pro}]</span>
                                <div>
                                    <p className="font-weight-bold h5 my-1 mt-2">{this.props.rand[this.state.orderNumber].vi.map((eachVietMean, index) => {
                                        if (index===0){
                                            return <span key={`${eachVietMean}1`}> {eachVietMean}</span>
                                        } else {
                                            return <span key={eachVietMean}>, {eachVietMean}</span>
                                        }
                                    })}</p>
                                </div>
                                <form className="pt-2" onSubmit={this.onFormSubmitExample}>
                                    <input onChange={e => this.handleExampleChange(e, this.props.rand[this.state.orderNumber]._id)} value={this.state.id === this.props.rand[this.state.orderNumber]._id ? this.state.myExample: ''} type="text" className="your-example mt-2" placeholder="Input your example here..."/>
                                </form>
                                <hr/>
                                <div>
                                    {this.renderMyExample(this.props.rand[this.state.orderNumber]._id)}
                                </div>
                                <div>
                                    {
                                        this.props.rand[this.state.orderNumber].yex.map((eachExample, index) => {
                                                    return <p key={eachExample} className="text text-danger font-italic">"{eachExample}"</p>
                                        })
                                    }
                                </div>
                                
                                <div>
                                    {
                                        this.props.rand[this.state.orderNumber].ex.map((eachExample, index) => {
                                                return <p key={eachExample} className="text-muted font-italic">"{eachExample}"</p>
                                        })
                                    }
                                </div>
                                <div>{
                                    this.props.rand[this.state.orderNumber].en.map(eachMeaning => {
                                        return (
                                            <div key={eachMeaning.en}>
                                                <p className="text-primary"><span key={eachMeaning.cat}>({eachMeaning.cat})</span> {eachMeaning.en}</p>
                                            </div>
                                            );
                                        } )
                                    }
                                </div>
                            </div>
                            <div className="col-sm-4">
                                {
                                    this.props.rand[this.state.orderNumber].img.map(eachImage => {
                                       return <img key={eachImage} src={eachImage} style={{width:'95%'}}  className="d-inline fluid img-thumbnail" alt="seachImage"/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
            );
        } else {
            return <p>Waiting...</p>
        }
    }
    
    
    render() {
        return (
          <div>
            <Header displaySignIn={true}/>
            <div className="container mt-5 d-flex flex-row-reverse flex-md-row">
                <button className="btn btn-primary mr-2 mb-4 w-25" onClick={this.configOrder}>Next</button>
                <button className="btn btn-danger mr-2 mb-4 w-25" onClick={this.handleClick}>Flip</button>
            </div>
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <div key="front" className="container">
                    {this.renderRandomFront()}
                </div>
                <div key="back" className="container">
                    {this.renderRandomBack()}
                </div>
             </ReactCardFlip>
          </div>  
        );
    }
    
    handleExampleChange = (e, id) => {
        this.setState({myExample: e.target.value, id:id});
    }
    
    playSound = (audio) => {
       const sound = new Audio(audio)
       sound.play();
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
                else {
                    return null
                }
            })
        }
    }
}
    

const mapStateToProps = (state) => {
    return {
        rand: Object.values(state.rand),
        currentUserId: state.auth.userId,
        post: state.postex
    }
}


export default connect(mapStateToProps,{fetchRandom, deleteWord, postMyExample})(FlashCard);