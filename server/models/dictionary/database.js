let mongoose =require("mongoose");
mongoose.set("debug", true);
var mongoosePaginate = require('mongoose-paginate');
let {mongoPasswordDatabase} = require('../../config')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Oxford database

var MyDatabase = mongoose.createConnection(`mongodb+srv://mydatabaseoxford:${mongoPasswordDatabase}@oxford-on657.mongodb.net/oxford`,{ useNewUrlParser: true });
let dictSchema = new mongoose.Schema({
   word: {
      type: String,
      lowercase: true
   },
   meaning: Array,
   image: Array,
   gooImage: Array
});

dictSchema.plugin(mongoosePaginate);

let DB = MyDatabase.model("Dict", dictSchema)

module.exports = DB



