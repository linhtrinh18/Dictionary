let axios = require("axios");
let urlGoogle ='https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=vi&hl=en&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&q=';

module.exports.googleApi = async (word_id)=> {
  const response = await axios.get(urlGoogle + word_id)
    return response
};
