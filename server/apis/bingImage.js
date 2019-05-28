let axios = require("axios");
let {subscriptionKeyBing} = require('../config') 
let headers= {'Ocp-Apim-Subscription-Key' : subscriptionKeyBing };

module.exports.bingImage = async word => {
    let urlBing = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q='+ word
    const response = await axios.get(urlBing,{headers})
    const rawImagewithText =[]
    response.data.value.map(image => {rawImagewithText.push([image.thumbnailUrl,image.name])})
    const image = {image: rawImagewithText}
    return image
};
