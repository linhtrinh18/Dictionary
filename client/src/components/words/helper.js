import React from 'react'

export const renderGoogle = (google) => {
    if(google) {
        return (
                <div>
                    <p className="font-weight-bold h1">{google.sentences[0].trans}</p>
                    <div>
                        {renderGoogleElement(google.dict)}
                    </div>
                    
                    
                    
                </div>
        );
    } else {
        return null
    }
}

const renderGoogleElement = (dicts) => {
    if(dicts){
        return dicts.map(dict => {
            return (
                <div>
                    <p class="text-uppercase text-success mt-2">{dict.pos}</p>
                    {dict.entry.map(vietMean => {
                          return (<div>
                                <p className="pl-2 font-weight-bold">{vietMean.word}</p>
                                <p className="pl-3 font-italic">"{vietMean.reverse_translation.map(each => {return `${each} `})}"</p>
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


export const renderOxford = (oxford) => {
    // console.log("OXFORD DATA", JSON.stringify(oxford))
    if(oxford) {
        return (
                <div>
                    <p className="display-3">{oxford[0].text}</p>
                    <a class="headwordAudio rsbtn_play" data-behaviour="ga-event" data-value="Pronunciation audio">
                        <audio src={renderOxfordAudio(oxford)} autoPlay>
                        </audio><img src="https://img.icons8.com/metro/26/000000/speaker.png" width="20px"/>
                    </a>
                    
                    <div>
                        {oxford.map(eachOxford => {
                            // console.log("eachOxford ", eachOxford)
                            if(eachOxford.entries){
                                 return eachOxford.entries.map((entry) => {
                                    // console.log("Each Entry ", entry)
                                    if(entry.senses){
                                        return entry.senses.map(sense => {
                                            console.log("Each sense ", sense)
                                            if(sense.definitions){
                                            console.log("EACH DEFINITION: ", sense.definitions[0])
                                                return (
                                                    <div>
                                                        <p className="font-weight-bold">{sense.definitions[0]}</p>
                                                        <div>{renderMainExampleOxford(sense.examples)}</div>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                })
                                
                            }
                            
                        })}
                    </div>
                    
    
                    
                </div>
        );
    } else {
        return null
    }
}

const renderOxfordAudio = (oxford) => {
    let audiolink = []
    oxford.map(pro1 => {
        if(pro1.pronunciations){
            pro1.pronunciations.map(pro2 => {
                return audiolink.push(pro2.audioFile)
            })
        }
    })
    return audiolink[0]
}


const renderMainExampleOxford = (examples) => {
    if (examples){
        return examples.map(example => {
            console.log("EXAMPLE NE: ", example.text[0])
            return <p>{example.text}</p>
        })
    } else {
        return null
    }
}
