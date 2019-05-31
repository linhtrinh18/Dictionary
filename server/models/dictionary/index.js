let mongoose =require("mongoose");
mongoose.set("debug", true);
var mongoosePaginate = require('mongoose-paginate');
let {mongoPassword} = require('../../config')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Linh database
var Translate = mongoose.createConnection(`mongodb+srv://thienthuan1717:${mongoPassword}@englishdictionaryreact-rntji.mongodb.net/dictionary`,{ useNewUrlParser: true });
let dictSchema =new mongoose.Schema({
   word: {
      type: String,
      require: true,
      lowercase: true
   },
   userId:{
      type: String,
      require: true
   },
   vi:{
      type: Array,
      lowercase: true
   },
   ex:{
      type: Array,
   },
   yex:{
      type: Array,
   },
   img:{
      type: Array,
      require: true,
   },
   pro:{
      type: String,
   },
   aud:{
      type: String,
   },
   en: Array
});

dictSchema.plugin(mongoosePaginate);

let Dict = Translate.model("Dict", dictSchema)

module.exports = Dict



