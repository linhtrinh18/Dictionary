
// Check whether the word input is plural or iregular verb or not
module.exports.checkBaseform = (word) =>{
    if(word.dict){
        return word.dict[0].base_form
    } else {
        return word.sentences[0].orig
    }
}