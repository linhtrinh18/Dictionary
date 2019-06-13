import React from 'react';
import { connect } from 'react-redux'
// import {renderGoogle, renderOxford, renderImage, test} from './helper'
import './styles/ShowStyle.css';
import { showExample, translateEngExample, showEngMean, showEngExample, updateSaveMeaning , createGoogle, removeEngMean, ShowMyExample, UpdateMeaning, showImage } from '../../actions'
import Header from '../Header'
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
            opacity: 0,
            index: null,
            def : null,
            display: 'none',
            img:null,
            trans:null,
            translate:[]
        }
    }
    renderMainpage = () => {
        if (!(Object.keys(this.props.showData.dict).length === 0)) {
            return (
                <div className = "mx-5 mt-4">
                    <div className="row">
                        <div key={'renderGoolge'} className="google col-md-2 mt-3"> {this.renderGoogle(this.props.showData.dict.google)}</div>
                        <div key={'renderOxford'} className="oxford col-md-7" style={{lineHeight: 'normal'}}> {this.renderOxford(this.props.showData.dict.oxford)} </div>
                        <div key={'renderBing'} className="col-md-3 border rounded mt-2"> {this.renderSaveSection(this.props.showData)}</div>
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
    render () {
        return (
            <div>
                <Header displaySignIn={true}/>
                {this.renderMainpage()}
            </div>
        );
    }
    
    
    onFormSubmitExample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.ShowMyExample(this.state.myExample)
        this.setState({myExample: ''});
    }
    handleExampleChange = (e) => {
        this.setState({myExample: e.target.value});
    }
    removeMyExample = (eachExample) => {
        this.props.ShowMyExample(eachExample)
    }
    renderShowMyExample = (data) => {
        if(data.yex){
            return data.yex.map((eachExample,index) => {
                return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p key={eachExample} className="font-italic text-danger">"{eachExample}"</p></div>
                        <div className="text-danger"><button onClick={e => this.removeMyExample(eachExample)}className="btn btn-danger btn-xs">X</button></div>
                     </div>    
                );
            })
        }
        
    }
    renderShowVietMeaning = (data) => {
        if(data.vi) {
            return data.vi.map((eachVietMean,index) => {
                return <span key={index}>, {eachVietMean}</span>
                })
            }
        
    }
    renderFirstVietMeaning = (data) => {
        if(data.data) {
            return <span>{data.data.vi[0]}</span>
        }
    }
    removeEngmean = (eachEngMean) => {
        this.props.removeEngMean(eachEngMean)
    }
    renderShowEngMeaning = (data) => {
        if(data.en) {
            return data.en.map((eachEngMean, index) => {
                return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p className="text-primary">{eachEngMean.en[0]}</p></div>
                        <div className="text-danger"><button onClick={e => this.removeEngmean(eachEngMean)} className="btn btn-danger btn-xs">X</button></div>
                     </div>  
                );
            })
        }
    }
    renderShowExample = (data) => {
        if(data){
            if (data.ex){
                return data.ex.map((eachEngExample,index) => {
                    return (
                    <div key={index} className="d-flex justify-content-between bd-highlight">
                        <div><p className="font-italic text-danger">"{eachEngExample}"</p></div>
                        <div className="text-danger"><button onClick={e => this.insertEngExample(eachEngExample)} className="btn btn-danger btn-xs">X</button></div>
                     </div>  
                    );
                })
            }
        }
    }
    renderShowpImage = (data) => {
        let image = data.img
    if(image) {
            return image.map((eachimage,index) => {
                return (
                    <div key={index} className="image-border-icon d-inline mt-2" onClick={e => this.removeSaveImage(eachimage)}>
                        <img src={eachimage} key={eachimage} className='image-display-icon d-inline' alt="from-bing"/>
                    </div>                
                );
            })
        } else {
            return null
        }
    
    }
    removeSaveImage = (image) => {
        this.props.showImage(image)
    }
    onSaveExampleClick = () => {
        this.props.updateSaveMeaning()
    }
    renderSaveSection(data) {
        if(data.dict.data){
        return (
            <div>
                <form className="pt-2" onSubmit={this.onFormSubmitExample}>
                    <input onChange={this.handleExampleChange} value={this.state.myExample} type="text" className="your-example mt-2" placeholder="Input your example here..."/>
                </form>
                <hr/>
                <p className="display-4 d-inline">{data.dict.data.word}</p>
                <button onClick={e => this.onSaveExampleClick()} className="btn btn-primary d-inline float-right">Save</button>
                <div className="mt-2 text-success h4"><span>{this.renderFirstVietMeaning(data.dict)}</span>{this.renderShowVietMeaning(data.post)}</div>
                <hr/>
                <div>{this.renderShowMyExample(data.post)}</div>
                <div>{this.renderShowExample(data.post)}</div>
                <div>{this.renderShowEngMeaning(data.post)}</div>
                <div>{this.renderShowpImage(data.post)}</div>
            </div>)
        }
    }
    //-------------------------Helper Method-------------------------------------//
    onSubmitTheCorrectWord = (formValues) => {
        this.props.createGoogle(formValues)
    }
    renderGoogle = (google, googleClickMe) => {
        if(google) {
                if(google.sentences) {
                    return (
                            <div>
                                <p key={google.sentences[0].trans} className="font-weight-bold h1">{google.sentences[0].trans}</p>
                                <div>
                                    {this.renderGoogleElement(google.dict)}
                                </div>
                            </div>
                    );
                } else {
                    return (
                        <div>
                        <p className="text text-danger h3"> {google[1]} ?  </p>
                        <p className="text text-success h4 mt-3">Did you mean: </p>
                        <button onClick={e => this.onSubmitTheCorrectWord({word: google[0]})} className="btn btn-success btn-lg">{'>>'} {google[0]} </button>
                        </div>
                     );
                } 
            } else {
                return null
            }
        }
    insertVietmean (vietMean) {
        this.props.showExample(vietMean)
    }
    renderGoogleElement = (dicts) => {
        if(dicts){
            return dicts.map((dict,index1) => {
                return (
                    <div key={index1}>
                        <p key={Math.floor(Math.random() * 1000)} className="text-uppercase text-success mt-2">{dict.pos}</p>
                        {dict.entry.map((vietMean,index) => {
                              return ( 
                                    <div key={index}>
                                        <div key={index} className="custom-control custom-checkbox" >
                                            <input key={`${vietMean.word}input`} type="checkbox" className="custom-control-input checkboxHide" id={vietMean.word} onClick={(e) => this.insertVietmean(vietMean.word)}/>
                                            <label key={`${vietMean.word}label`}className="custom-control-label font-weight-bold showCheckBox" htmlFor={vietMean.word}>{vietMean.word}</label>
                                        </div>
                                        <p key={`${vietMean.word}p`} className="pl-3 font-italic">"{vietMean.reverse_translation.map(each => {return `${each} `})}"</p>
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
    playSound = (audio) => {
       const sound = new Audio(audio)
       sound.play();
    }
    renderOxford = (oxford) => {
    if(oxford) {
        return (
                <div key={'oxford'} className="border-left">
                    <div key={oxford[0].text} className="ml-2">
                        <p className="display-4">{oxford[0].text}</p>
                        <span onClick={e => this.playSound(this.renderOxfordAudio(oxford).audio) }>
                            <audio key={this.renderOxfordAudio(oxford).audio} src={this.renderOxfordAudio(oxford).audio} autoPlay>
                            </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" alt="speaker" width="20px"/>
                        </span> <span className="h5"> [{this.renderOxfordAudio(oxford).phonetic}]</span>
                        <div key={this.renderOxfordBody(oxford)} className="mt-2">{this.renderOxfordBody(oxford)}</div>
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
                if(pro2.phoneticSpelling && pro2.phoneticNotation === 'IPA'){
                    phoneticSpelling.push(pro2.phoneticSpelling);
                }
            });
        }
        return null
    })
    return {audio: audiolink[0], phonetic: phoneticSpelling[0] }
}
    renderOxfordBody = (oxford) => {
        if(oxford) {
        return oxford.map((eachOxford, index) => {
                return (
                    <div key={index}>
                        <p key={eachOxford.lexicalCategory} id="lexicalCategory" className="text-success text-uppercase h5 mt-3">{eachOxford.lexicalCategory.text}</p>
                        <div key={eachOxford}> {this.renderMeaningExample(eachOxford, eachOxford.lexicalCategory)}</div>
                    </div>
                );
            });
            
    
        } else {
            return null
        }
    }
    renderMeaningExample = (eachOxford, lexicalCategory) => {
    if (eachOxford) {
        return eachOxford.entries.map((entries, index1) => {
                if (entries.senses) {
                    return entries.senses.map((sense, index2) => {
                        return (
                            <div key={index2}>
                                <div id="mainDefinition">{this.renderMainDefinition(sense, index2, lexicalCategory)}</div>
                                <div id="mainExample">{this.renderMainExample(sense)}</div>
                                <div id="renderSubMean">{this.renderSubMean(sense, index2 ,lexicalCategory)}</div>
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
    mouseEnter = (definition ) => {
        this.setState({
            def: definition
        })
    }
    mouseLeave = () => {
        this.setState({def: null})
    }
    insertEngmean = (engMeaning, lexicalCategory) => {
        this.props.showEngMean(engMeaning, lexicalCategory)
    }
    renderMainDefinition = (sense, index , lexicalCategory) => {
        if (sense.definitions) {
            return (
                    <div key={index} className="pr-5">
                        <p key={sense.definitions[0]} className="font-weight-bold d-inline" value={sense.definitions[0]}  id="mainExample">{index+1}. {sense.definitions[0]}</p>
                        <div className="d-inline" onMouseEnter={e => {this.mouseEnter(sense.definitions[0])}} onMouseLeave={this.mouseLeave}
                                    style={{opacity: this.state.def === sense.definitions[0] ? '0.7': '0.1'}} >
                                <button
                                    className="btn btn btn-outline-secondary btn-xs ml-2 d-inline" 
                                    onClick={(e) => {this.translateEngExample(sense.definitions[0])}}>
                                        Trans
                                </button>
                                <button
                                    className="btn btn btn-outline-success btn-xs ml-1 d-inline" 
                                    onClick={(e) => this.insertEngmean(sense.definitions[0], lexicalCategory)}
                                >
                                    Save
                                </button>
                        </div>
                        <span className="font-weight-bold d-block text-primary">{this.renderVietTranslate(sense.definitions[0])}</span>
                    </div>
            );
        } else {
            return null
        }
    }
    insertEngExample = (engExample) => {
        this.props.showEngExample(engExample)
    }
    translateEngExample = async (example) => {
        const myTranslate = await this.props.translateEngExample(example)
        let myTrans = this.state.translate
        myTrans.push({ex: example, trans:myTranslate.data.trans})
        this.setState({trans: myTrans})
    }
    renderMainExample = (sense) => {
    if (sense) {
            if (sense.examples){
                return sense.examples.map((example,index) => {
                    return ( 
                        <div key={index} className="pr-5">
                            <p id="mainExample" className="font-italic ml-2 d-inline">"{example.text}"</p>
                            <div className="d-inline" onMouseEnter={e => {this.mouseEnter(example.text)}} onMouseLeave={this.mouseLeave}
                                    style={{opacity: this.state.def === example.text ? '0.7': '0.1'}} 
                                    >
                                <button
                                    className="btn btn btn-outline-secondary btn-xs ml-2 d-inline" 
                                    onClick={(e) => {this.translateEngExample(example.text)}}>
                                        Trans
                                </button>
                                <button
                                    className="btn btn btn-outline-success btn-xs ml-1 d-inline" 
                                    onClick={(e) => {this.insertEngExample(example.text)}}
                                >
                                        Save
                                </button>
                            </div>
                            <span className="font-italic ml-2 d-block text-primary">{this.renderVietTranslate(example.text)}</span>
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
    renderVietTranslate = (example) => {
        if(this.state.trans){
            return this.state.trans.map(eachExample => {
                                if(eachExample.ex === example){
                                    return `"${eachExample.trans}"`
                                }
                                else {
                                    return null
                                }
                            })
        }
    }
    renderSubMean = (sense, index, lexicalCategory ) => {
    if (sense){
            if (sense.subsenses){
                return sense.subsenses.map((subsense, submeanIndex) => {
                    if(subsense) {
                        return (
                            <div key={submeanIndex} >
                                <div>
                                        <p id="subMeaning" className="ml-3 font-weight-bold d-inline">{index+1}.{submeanIndex+1} {this.renderSubMeaning(subsense)}
                                        </p>
                                    <div className="d-inline" onMouseEnter={e => {this.mouseEnter(this.renderSubMeaning(subsense))}} onMouseLeave={this.mouseLeave}
                                        style={{opacity: this.state.def === this.renderSubMeaning(subsense) ? '0.7': '0.1'}} >
                                        <button
                                            className="btn btn btn-outline-secondary btn-xs ml-2 d-inline" 
                                            onClick={(e) => {this.translateEngExample(this.renderSubMeaning(subsense))}}>
                                                Trans
                                        </button>
                                        <button
                                            className="btn btn btn-outline-success btn-xs ml-1 d-inline" 
                                            onClick={(e) => this.insertEngmean(this.renderSubMeaning(subsense),lexicalCategory)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <span className="d-block ml-3 font-weight-bold text-primary">{this.renderVietTranslate(this.renderSubMeaning(subsense))}</span>
                                </div>
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
                    return subsense.definitions[0]
            } else {
                if (subsense.shortDefinitions){
                    return subsense.shortDefinitions[0]
                } else {
                    if(subsense.crossReferenceMarkers){
                        return subsense.crossReferenceMarkers[0]
                    }
                }
            }
        } else {
            return null
        }
    }
    renderSubExample = (subsense) => {
        if(subsense){
            if(subsense.examples){
                return subsense.examples.map((example,index3) => {
                    return (
                    <div key={index3} className="pr-5">
                        <p id="subExamples" className="ml-5 font-italic d-inline">"{example.text}"
                        </p>
                        <div className="d-inline" onMouseEnter={e => {this.mouseEnter(example.text)}} onMouseLeave={this.mouseLeave}
                                    style={{opacity: this.state.def === example.text ? '0.7': '0.1'}} 
                                    >
                                <button
                                    className="btn btn btn-outline-secondary btn-xs ml-2 d-inline" 
                                    onClick={(e) => {this.translateEngExample(example.text)}}>
                                        Trans
                                </button>
                                <button
                                    className="btn btn btn-outline-success btn-xs ml-1 d-inline" 
                                    onClick={(e) => {this.insertEngExample(example.text)}}
                                >
                                        Save
                                </button>
                        </div>
                        <span className="ml-5 font-italic d-block text-primary">{this.renderVietTranslate(example.text)}</span>
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
    selectImage = (eachimage) => {
        this.setState({img: eachimage})
        this.props.showImage(eachimage)
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
    }

const mapStateToProps = (state) => {
    return {showData: state}
}


export default connect(mapStateToProps, {translateEngExample, updateSaveMeaning,createGoogle,removeEngMean,showExample, showEngMean, showEngExample, ShowMyExample, UpdateMeaning, showImage})(WordShow);
