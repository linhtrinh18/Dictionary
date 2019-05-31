import React from 'react'
//--------------------------Render GOOOGLE ------------------------------------//
export const renderGoogle = (google) => {
    console.log("GOOGLE SENTENCES", google)
    if(google) {
        if(google.sentences) {
            return (
                    <div>
                        <p className="font-weight-bold h1">{google.sentences[0].trans}</p>
                        <div>
                            {renderGoogleElement(google.dict)}
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

const renderGoogleElement = (dicts) => {
    if(dicts){
        return dicts.map(dict => {
            return (
                <div>
                    <p key={Math.floor(Math.random() * 1000)} className="text-uppercase text-success mt-2">{dict.pos}</p>
                    {dict.entry.map(vietMean => {
                          return (<div>
                                <p key={Math.floor(Math.random() * 1000)} className="pl-2 font-weight-bold">{vietMean.word}</p>
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
//--------------------------End Render GOOOGLE ------------------------------------//



//-------------------------- Render OXFORD ----------------------------------------//

export const renderOxford = (oxford) => {
    // console.log("OXFORD DATA", JSON.stringify(oxford))
    if(oxford) {
        return (
                <div>
                    <p className="display-4">{oxford[0].text}</p>
                    <a className="headwordAudio rsbtn_play" data-behaviour="ga-event" data-value="Pronunciation audio" href="/">
                        <audio src={renderOxfordAudio(oxford).audio} autoPlay>
                        </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" alt="speaker" width="20px"/>
                    </a> <span className="h5"> [{renderOxfordAudio(oxford).phonetic}]</span>
                    <div className="mt-2">{renderOxfordBody(oxford)}</div>
                    

                    
    
                    
                </div>
        );
    } else {
        return null
    }
}

const renderOxfordAudio = (oxford) => {
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



const renderOxfordBody = (oxford) => {
    // console.log("oxford", oxford)
    if(oxford) {
    return oxford.map((eachOxford) => {
            return (
                <div>
                    <p id="lexicalCategory" className="text-success text-uppercase h5">{eachOxford.lexicalCategory}</p>
                    <div>{renderMeaningExample(eachOxford)}</div>
                </div>
            );
        });
        

    } else {
        return null
    }
}


const renderMeaningExample = (eachOxford) => {
    if (eachOxford) {
        // console.log("eachOxford", eachOxford)
        return eachOxford.entries.map((entries, index1) => {
            if (entries.senses) {
                return entries.senses.map((sense, index2) => {
                    return (
                        <div>
                            <p id="mainDefinition">{renderMainDefinition(sense, index2)}</p>
                            <p id="mainExample">{renderMainExample(sense)}</p>
                            <div id="renderSubMean">{renderSubMean(sense, index2)}</div>
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


const renderMainDefinition = (sense, index) => {
    if (sense.definitions) {
        return <p id="mainExample" className="font-weight-bold">{index+1}. {sense.definitions[0]}</p>
    } else {
        return null
    }
}

const renderMainExample = (sense) => {
    // console.log("sense", sense)
    if (sense) {
        if (sense.examples){
            return sense.examples.map(example => {
                // console.log("example", example)
                return <p id="mainExample" className="font-italic ml-2">"{example.text}"</p>
            })
        } else {
            return null
        }
    } else {
        return null
    }
}

const renderSubMean = (sense, index ) => {
    if (sense){
        if (sense.subsenses){
            return sense.subsenses.map((subsense, submeanIndex) => {
                if(subsense) {
                    return (
                        <div>
                            <p id="subMeaning" className="ml-3 font-weight-bold">{index+1}.{submeanIndex+1} {renderSubMeaning(subsense)}</p>
                            <div id="subExamples">{renderSubExample(subsense)}</div>
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


const renderSubMeaning = (subsense) => {
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

const renderSubExample = (subsense) => {
    if(subsense){
        if(subsense.examples){
            return subsense.examples.map(example => {
                // console.log("SUB EXAMPLE" , example )
                return <p id="subExamples" className="ml-5 pl-3 font-italic">"{example.text}"</p>
            })
        } else {
            return null
        }
        
    } else {
        return null
    }
}


export const renderImage = (bing) => {
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