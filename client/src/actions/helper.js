module.exports.extraBaseForm = (word) => {
    if(word.dict){
        return word.dict[0].base_form
    } else {
        return word.sentences[0].orig
    }
}