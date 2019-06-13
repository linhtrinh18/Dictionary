let {google_image_key} = require('../config')
let axios = require("axios");
let urlGoogle = `https://www.googleapis.com/customsearch/v1/?key=${google_image_key}&cx=005035423181726462744:dd9siarcnnu&searchType=image&q=`

module.exports.googleImage = async (word_id)=> {
    const response = await axios.get(urlGoogle + word_id.toLowerCase())
    return response
};
