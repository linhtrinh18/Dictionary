import React from 'react';

import {translateEngExample, showEngExample, showEngMean} from '../../actions'
import { connect } from 'react-redux'

class OxfordSection extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            def : null,
            trans:null,
            translate:[]
        }
    }
    
    renderOxford = (oxford) => {
    if(oxford) {
        return (
                <div key={'oxford'}>
                    <div key={oxford[0].text}>
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
    
    translateEngExample = async (example) => {
        const myTranslate = await this.props.translateEngExample(example)
        let myTrans = this.state.translate
        myTrans.push({ex: example, trans:myTranslate.data.trans})
        this.setState({trans: myTrans})
    }
    
    
    insertEngExample = (engExample) => {
        this.props.showEngExample(engExample)
    }
    
    insertEngmean = (engMeaning, lexicalCategory) => {
        this.props.showEngMean(engMeaning, lexicalCategory)
    }
    mouseEnter = (definition) => {
        this.setState({
            def: definition
        })
    }
    mouseLeave = () => {
        this.setState({def: null})
    }
    
    
    playSound = (audio) => {
       const sound = new Audio(audio)
       sound.play();
    }


    render() {
        return (
            <div>
                {this.renderOxford(this.props.oxford)}
            </div>
        ); 
    }
}


export default connect(null, { translateEngExample, showEngExample, showEngMean })(OxfordSection)