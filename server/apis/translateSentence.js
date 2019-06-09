let axios = require("axios");
let urlGoogle ='https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&hl=en&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&q=';

module.exports.translateSentence = async (example) => {
    let sentence = encodeURI(example)
    const response = await axios.get(urlGoogle + sentence)
    // console.log(JSON.stringify(response.data))
    return response.data
}