let express         = require("express"),
    app             = express(),
    port            = process.env.PORT || 3000,
    dictRoute       = require("./routes/dictionaryRoute"),
    bodyParser      = require("body-parser"),
    path            = require("path")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
// //   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use("/eng", dictRoute);
app.listen(8081, function(err){
    if(err){
        console.log(`App error:${err}`)
    } else{
        console.log("App is running successfully on port:" + port)
    }
    
})