let mongoose =require("mongoose");
mongoose.set("debug", true);
var mongoosePaginate = require('mongoose-paginate');
let {mongoPassword} = require('../../config')

//Linh database
var Translate = mongoose.createConnection(`mongodb+srv://thienthuan1717:${mongoPassword}@englishdictionaryreact-rntji.mongodb.net/dictionary`,{ useNewUrlParser: true });

let dictSchema =new mongoose.Schema({
   word: {
      type: String,
      require: true
   },
   userId:{
      type: String,
      require: true
   },
   created_date:{
       type:Date,
       default: new Date()
   }
});

dictSchema.plugin(mongoosePaginate);

let Dict = Translate.model("Dict", dictSchema)

module.exports = Dict



