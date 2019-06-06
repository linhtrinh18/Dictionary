let axios = require("axios");
const {app_id_oxford} = require('../config');
const {app_key_oxford} = require('../config')

module.exports.oxfordApi = async (word_id) => {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/en-us/' + word_id.toLowerCase();
    const response = await axios.get(url,{
    json:true,
      	headers: {
      	'app_id': app_id_oxford, 'app_key': app_key_oxford
      	}  
    })
    return response.data.results[0].lexicalEntries
}

