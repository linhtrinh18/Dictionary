let axios = require('axios');

module.exports.spellCheck = async (word) => {
    let url = 'https://montanaflynn-spellcheck.p.rapidapi.com/check/?text=' + word
    const response = await axios.get(url,{
    json:true,
      	headers: {
      	'X-RapidAPI-Host': 'montanaflynn-spellcheck.p.rapidapi.com', 
      	'X-RapidAPI-Key': '5a7916835dmshdd6bc13aa15fc53p16d72ajsnd9ad64261257'
      	}  
    })
    return response.data.suggestion
}