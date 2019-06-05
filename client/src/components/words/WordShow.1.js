import React from 'react';
import { connect } from 'react-redux'
// import {renderGoogle, renderOxford, renderImage, test} from './helper'
import './styles/ShowStyle.css';
import { showExample, showEngMean, showEngExample , ShowMyExample } from '../../actions'


class WordShow extends React.Component {
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
            opacity: 1
        }
    }
    
    render() {
        if (!(Object.keys(this.props.showData.dict).length === 0)) {
            return (
                <div className = "mx-5 mt-4">
                    <div className="row">
                        <div className="google col-md-2 mt-3"> {this.renderGoogle(this.props.showData.dict.google)}</div>
                        <div className="oxford col-md-7" style={{lineHeight: 'normal'}}> {this.renderOxford(this.props.showData.dict.oxford)} </div>
                        <div className="border rounded col-md-3 mt-3"> {this.renderSaveSection(this.props.showData)}</div>
                    </div>
                    <section className="mt-3">
                            {this.renderImage(this.props.showData.dict.image)}
                    </section>
                </div>
            );
            
        } else {
            return <div></div>
        }
    }
    
    onFormSubmitExample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.myExample.push(this.state.myExample)
        console.log("TARGET", this.state.myExample)
        this.props.ShowMyExample(this.myExample)
        this.setState({myExample: ''});
    }
    
    handleExampleChange = (e) => {
        this.setState({myExample: e.target.value});
    }
    
    
    renderShowMyExample = (data) => {
        if(data.myExample){
            return data.myExample.map(eachExample => {
                return <p className="font-italic text-danger">"{eachExample}"</p>
            })
        }
    }
    renderShowVietMeaning = (data) => {
        if(data.vietMean) {
            return data.vietMean.map(eachVietMean => {
                return <span>{eachVietMean},</span>
            })
        }
    }
    
    renderShowEngMeaning = (data) => {
        if(data.engMean) {
            return data.engMean.map(eachEngMean => {
                return <p className="text-primary">{eachEngMean},</p>
            })
        }
    }
    
    renderShowExample = (data) => {
        if (data.engExample){
            return data.engExample.map(eachEngExample => {
                return <p className="font-italic text-danger">"{eachEngExample}"</p>
            })
        }
    }
    renderSaveSection(data) {
        console.log("DATA", data)
        return (
            <div>
                <form onSubmit={this.onFormSubmitExample}>
                    <input onChange={this.handleExampleChange} value={this.state.myExample} type="text" className="your-example mt-2" placeholder="Your example here..."/>
                </form>
                <hr/>
                <p className="display-4">{data.dict.data.word}</p>
                <div>{this.renderShowVietMeaning(data.post)}</div>
                <hr/>
                <div>{this.renderShowMyExample(data.post)}</div>
                <div>{this.renderShowExample(data.post)}</div>
                <div>{this.renderShowEngMeaning(data.post)}</div>
            </div>)
    }
    
    //-------------------------Helper Method-------------------------------------//
    renderGoogle = (google, googleClickMe) => {
    // console.log("GOOGLE SENTENCES", google)
        if(google) {
                if(google.sentences) {
                    return (
                            <div>
                                <p className="font-weight-bold h1">{google.sentences[0].trans}</p>
                                <div>
                                    {this.renderGoogleElement(google.dict)}
                                </div>
                            </div>
                    );
                } else {
                    return <p>{google}</p> // The invalid word sending back from server
                }
            } else {
                return null
            }
        }
    insertVietmean (vietMean) {
        // Check if the length of the last items of the data is the same ==> Delete the last one
        this.vietMeaning.push(vietMean)
        console.log("!!!!", this.vietMeaning)
        this.props.showExample(this.props.showData.dict.data._id, this.vietMeaning)
    }
    renderGoogleElement = (dicts) => {
        if(dicts){
            return dicts.map(dict => {
                return (
                    <div>
                        <p key={Math.floor(Math.random() * 1000)} className="text-uppercase text-success mt-2">{dict.pos}</p>
                        {dict.entry.map(vietMean => {
                              return ( 
                                    <div>
                                        <div className="custom-control custom-checkbox" >
                                            <input type="checkbox" className="custom-control-input checkboxHide" id={vietMean.word} onClick={(e) => this.insertVietmean(vietMean.word)}/>
                                            <label className="custom-control-label font-weight-bold showCheckBox" for={vietMean.word}>{vietMean.word}</label>
                                        </div>
                                        <p key={Math.floor(Math.random() * 1000)} className="pl-3 font-italic">"{vietMean.reverse_translation.map(each => {return `${each} `})}"</p>
                                    </div>
                              );
                        })}
                    </div>
                );
            })
        } else {
            return null
        }
    } 
    renderOxford = (oxford) => {
    // console.log("OXFORD DATA", JSON.stringify(oxford))
    if(oxford) {
        return (
                <div className="border-left">
                    <div className="ml-2">
                        <p className="display-4">{oxford[0].text}</p>
                        <a className="headwordAudio rsbtn_play" data-behaviour="ga-event" data-value="Pronunciation audio" href="/">
                            <audio src={this.renderOxfordAudio(oxford).audio} autoPlay>
                            </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" alt="speaker" width="20px"/>
                        </a> <span className="h5"> [{this.renderOxfordAudio(oxford).phonetic}]</span>
                        <div className="mt-2">{this.renderOxfordBody(oxford)}</div>
                    </div>
                </div>
        );
    } else {
        return null
    }
}
    renderOxfordAudio = (oxford) => {
    let audiolink = [];
    let phoneticSpelling = [];
    oxford.map(pro1 => {
        if(pro1.pronunciations){
            pro1.pronunciations.forEach(pro2 => {
                audiolink.push(pro2.audioFile);
                phoneticSpelling.push(pro2.phoneticSpelling);
            });
        }
        return null
    })
    return {audio: audiolink[0], phonetic: phoneticSpelling[0] }
}
    renderOxfordBody = (oxford) => {
    // console.log("oxford", oxford)
        if(oxford) {
        return oxford.map((eachOxford) => {
                return (
                    <div>
                        <p id="lexicalCategory" className="text-success text-uppercase h5">{eachOxford.lexicalCategory}</p>
                        <div>{this.renderMeaningExample(eachOxford)}</div>
                    </div>
                );
            });
            
    
        } else {
            return null
        }
    }
    renderMeaningExample = (eachOxford) => {
    if (eachOxford) {
        // console.log("eachOxford", eachOxford)
        return eachOxford.entries.map((entries, index1) => {
            if (entries.senses) {
                return entries.senses.map((sense, index2) => {
                    return (
                        <div>
                            <div id="mainDefinition">{this.renderMainDefinition(sense, index2)}</div>
                            <p id="mainExample">{this.renderMainExample(sense)}</p>
                            <div id="renderSubMean">{this.renderSubMean(sense, index2)}</div>
                        </div>
                    );
                })
            } else {
                return null
            }
        })
    } else {
        return null
    }
}
    mouseEnter = (e) => {
        // console.log('mouse enter')
        this.setState({opacity: 0.3})
        // console.log(e.target)
    }
    mouseLeave = () => {
        // console.log('mouse leave')
        this.setState({opacity: 1})
    }
    insertEngmean = (engMeaning) => {
        this.engMeaning.push(engMeaning)
        console.log("!!!!", this.engMeaning)
        this.props.showEngMean(this.props.showData.dict.data._id, this.engMeaning)
    }
    renderMainDefinition = (sense, index) => {
        // onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
        if (sense.definitions) {
            return (
                <div>
                    <p value={sense.definitions[0]}  id="mainExample" className="font-weight-bold">{index+1}. {sense.definitions[0]}
                        <input style={{opacity: this.state.opacity}} type="checkbox" onClick={(e) => this.insertEngmean(sense.definitions[0])} />
                    </p>
                </div>
            );
        } else {
            return null
        }
    }
    insertEngExample = (engExample) => {
        this.engExample.push(engExample)
        // console.log("!!!!ENG EXAMPLE", this.engExample)
        this.props.showEngExample(this.props.showData.dict.data._id, this.engExample)
    }
    renderMainExample = (sense) => {
    // console.log("sense", sense)
    if (sense) {
            if (sense.examples){
                return sense.examples.map(example => {
                    // console.log("example", example)
                    return ( 
                        <div>
                        <p id="mainExample" className="font-italic ml-2">"{example.text}"
                            <input type="checkbox" onClick={(e) => this.insertEngExample(example.text)}/>
                        </p>
                        
                        </div>
                        );
                })
            } else {
                return null
            }
        } else {
            return null
        }
    }
    renderSubMean = (sense, index ) => {
    if (sense){
            if (sense.subsenses){
                return sense.subsenses.map((subsense, submeanIndex) => {
                    if(subsense) {
                        return (
                            <div>
                                <p id="subMeaning" className="ml-3 font-weight-bold">{index+1}.{submeanIndex+1} {this.renderSubMeaning(subsense)}
                                    <input type="checkbox" onClick={(e) => this.insertEngmean(this.renderSubMeaning(subsense))}/>
                                </p>
                                <div id="subExamples">{this.renderSubExample(subsense)}</div>
                            </div>
                        );
                    } else {
                        return null
                    }
                })
            } else {
                return null
            }
        } else {
            return null
        }
    }
    renderSubMeaning = (subsense) => {
        if(subsense) {
            if(subsense.definitions) {
                // console.log("subsense.definitions", subsense.definitions)
                    return subsense.definitions[0]
            } else {
                if (subsense.short_definitions){
                    return subsense.short_definitions[0]

                } else {
                    return null
                }
            }
        } else {
            return null
        }
    }
    renderSubExample = (subsense) => {
        if(subsense){
            if(subsense.examples){
                return subsense.examples.map(example => {
                    // console.log("SUB EXAMPLE" , example )
                    return <p id="subExamples" className="ml-5 font-italic">"{example.text}"
                        <input type="checkbox" onClick={(e) => this.insertEngExample(example.text)}/>
                    </p>
                })
            } else {
                return null
            }
            
        } else {
            return null
        }
    }
    renderImage = (bing) => {
    // console.log("BING", bing)
    if(bing) {
        return bing.map(eachimage => {
            return (
                <div className="image-border">
                    <img src={eachimage[0]} className="image-display" alt="from-bing"/>
                 </div>                
            );
        })
    } else {
        return null
    }
}
    
}

const mapStateToProps = (state) => {
    // console.log("ShowState: ",  state)
    return {showData: state}
}


export default connect(mapStateToProps, {showExample, showEngMean, showEngExample, ShowMyExample})(WordShow);
