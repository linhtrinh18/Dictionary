let mongoose =require("mongoose");
mongoose.set("debug", true);
var mongoosePaginate = require('mongoose-paginate');
let {mongoPassword} = require('../config')

//Linh database
var conTranslate = mongoose.createConnection(`mongodb+srv://thienthuan1717:${mongoPassword}@englishdictionaryreact-rntji.mongodb.net/dictionary`,{ useNewUrlParser: true });

mongoose.Promise = Promise;
let dictSchema =new mongoose.Schema({
   word: {
      type: String,
      require: true
   },
   vimean: Array,
   enmean: Array,
   audio: String,
   pro: String,
   source: String,
   completed:{
       type: Boolean,
       default: false
   },
   image: Array,
   myImage:Array,
   other:{},
   score: {
       type: Number,
       default: 0
   },
   example: Array,
   myExample:Array,
   created_date:{
       type:Date,
       default: new Date()
   }
});

dictSchema.plugin(mongoosePaginate);

let Dict = conTranslate.model("Dict", dictSchema)

module.exports.Dict = Dict

