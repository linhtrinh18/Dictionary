
// Check whether the word input is plural or iregular verb or not
module.exports.checkBaseform = (word) =>{
    if(word.dict){
        return word.dict[0].base_form
    } else {
        return word.sentences[0].orig
    }
}

// Create data structure for Viet Mean
module.exports.saveVietMean = (body, data) => {
  let vi = []
  vi.push(data.sentences[0].trans)
  return {...body, vi:vi}
}



module.exports.renderEnglishMeaning = (data) => {
    if(data){
        const oxfordData = [];
        const audioFile = [];
        const phoneticSpelling = [];
        // console.log("@@@@@@@@@", JSON.stringify(data))
        data.forEach(eachlexicalCategory =>{
            // console.log({cat : eachlexicalCategory.lexicalCategory, en: [eachlexicalCategory.entries[0].senses[0].definitions[0]]})
            if((eachlexicalCategory.entries[0].senses[0].definitions || eachlexicalCategory.entries[0].senses[0].short_definitions)){
            oxfordData.push(
                
                    {   cat : eachlexicalCategory.lexicalCategory ? eachlexicalCategory.lexicalCategory: null,
                        en: [
                                eachlexicalCategory.entries[0].senses[0].definitions ? eachlexicalCategory.entries[0].senses[0].definitions[0] : eachlexicalCategory.entries[0].senses[0].short_definitions[0]
                            ]
                        
                    }
                )
            }
                if(eachlexicalCategory.pronunciations){
                    if(eachlexicalCategory.pronunciations[0].audioFile){
                        audioFile.push(eachlexicalCategory.pronunciations[0].audioFile)
                    }
                    if(eachlexicalCategory.pronunciations[0].phoneticSpelling){
                        phoneticSpelling.push(eachlexicalCategory.pronunciations[0].phoneticSpelling)
                    }
                }
        })
        // console.log('@@@@@@@@@', JSON.stringify(oxfordData))
        
        // console.log("AudioFile: ", phoneticSpelling)
        return {oxfordData: oxfordData, audioFile:audioFile[0], phoneticSpelling:phoneticSpelling[0]}
    }
}