let express         = require("express"),
    app             = express(),
    port            = process.env.PORT || 3000,
    dictRoute       = require("./routes/dictionaryRoute")


app.use("/dict/api", dictRoute);



app.listen(port, function(err){
    if(err){
        console.log(`App error:${err}`)
    } else{
        console.log("App is running successfully on port:" + port)
    }
    
})