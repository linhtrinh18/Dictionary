let express = require("express");
let router = express.Router();
let Dict = require("../models/dictionary");
let DB = require("../models/dictionary/database");
let {oxfordApi} = require('../apis/oxford')
let {googleApi} = require('../apis/googleTrans')
let {bingImage} = require('../apis/bingImage')
let {spellCheck} = require('../apis/spellCheck')
let {googleImage} = require('../apis/googleImage')
let {translateSentence} = require('../apis/translateSentence')
let helper = require('./helper/helper')

router.get('/dict/:userId', async (req, res)=>{
    const userId = req.params.userId
    try {
        const dict = await Dict.find({userId})
        if (!dict){
            return res.status(404).send()
        }
        res.send(dict)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/review-page', async (req, res)=>{
    const userId = req.body.userId
    const currentPage= req.body.page
    try {
        const dict = await Dict.paginate({userId}, { page: currentPage, limit: 12, sort: {$natural:-1 } })
        res.send(dict)
    } catch (e) {
        res.status(400).send(e)
    }
})




router.post('/updateexample', async (req, res)=>{
    try {
        const dict = await Dict.findById(req.body._id)
        dict.yex = dict.yex.concat([req.body.yex])
        const saveDict = await dict.save()
        res.send("Successfully update")
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/oxford', async (req, res)=>{
    try {
        const word = req.body.word.toLowerCase()
        // const response = await oxfordApi(req.body.word)
        const database = await DB.find({word:word})
        if(database.length === 0) {
            console.log("NO DATA BASE - GO WITH OXFORD")
            const response = await oxfordApi(word)
            res.status(201).send({oxford: response});
            //If no Database --> save to DB
            const newDict = new DB({word: word, meaning : response})
            await newDict.save()
            const oxfordData = helper.renderEnglishMeaning(response)
            const dict = await Dict.findByIdAndUpdate(req.body._id,{en: oxfordData.oxfordData, pro:oxfordData.phoneticSpelling, aud:oxfordData.audioFile }, {new: true})
        } else {
            console.log("HAVE ONE - GO WITH DATABASE")
            const convertToJSON = JSON.stringify(database)
            const newDatabase = JSON.parse(convertToJSON)
            res.status(201).send({oxford: newDatabase[0].meaning, image:newDatabase[0].image});
            const oxfordData = helper.renderEnglishMeaning(newDatabase[0].meaning)
            const dict = await Dict.findByIdAndUpdate(req.body._id,{en: oxfordData.oxfordData, pro:oxfordData.phoneticSpelling, aud:oxfordData.audioFile }, {new: true})
        }
    }catch (e) {
        res.status(400).send(e)
    }
})



router.post('/trans', async (req, res)=>{
    try {
        const response = await translateSentence(req.body.trans)
        res.status(201).send({trans:response.sentences[0].trans});
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/delete', async (req, res)=>{
    try {
        const removeItem = await Dict.findByIdAndRemove(req.body._id)
        res.status(201).send(removeItem);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/update', async (req, res)=>{
    try {
        const dict = await Dict.findById(req.body.data._id)
        let updates = Object.keys(req.body.data)
        if(req.body.data.en){
            req.body.data.en.forEach(eachEn =>{
                eachEn.cat = eachEn.cat.text
            })
        }
        updates.forEach((update)=> {
            if(Array.isArray(dict[update])){
                dict[update] = dict[update].concat(req.body.data[update])
            }
        })
        await dict.save()

        res.send("Successfully update")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/googleimage', async (req,res) => {
    try {
        const response = await googleImage(req.body.word.toLowerCase())
        const gooImage = []
        response.data.items.forEach(eachImage => {
            gooImage.push(eachImage.link)
        })
        res.status(201).send({gooImage: gooImage});
        await DB.findOneAndUpdate({word: req.body.word.toLowerCase()}, {googImage: gooImage}, {upsert: true})
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/google', async (req, res) => {
    const response = await googleApi(req.body.word)
    const baseFrom = helper.checkBaseform(response.data)
    // Check valid word
    if(response.data.dict || response.data.sentences && response.data.confidence === 1) {
        req.body.word = baseFrom;
        const saveData = helper.saveVietMean(req.body,response.data)
        const dict = new Dict(saveData)
        try {
            await dict.save()
            res.status(201).send({data: dict, google:response.data});
        }catch(e) {
            res.status(400).send(e)
        }
    } else {
        const spellCheckResonse = await spellCheck(req.body.word)
        if (spellCheckResonse === baseFrom) {
            req.body.word = baseFrom;
            const saveData = helper.saveVietMean(req.body,response.data)
            const dict = new Dict(saveData)
            try {
                await dict.save()
                res.status(201).send({data: dict, google:response.data});
            }catch(e) {
                res.status(400).send(e)
            }
        } else {
            res.status(201).send({google: [spellCheckResonse, req.body.word] });
        }
    }
});

router.post('/bing', async (req, res) => {
    try {
        const word = req.body.word.toLowerCase()
        const response = await bingImage(word)
        res.status(201).send(response);
        await DB.findOneAndUpdate({word: word.toLowerCase()}, {image: response.image}, {upsert: true})
    } catch (e) {
        res.status(400).send(e)
    }
});


router.post('/bingimage', async (req, res) => {
    const _id = req.body.userId
    try {
        const dict = await Dict.findByIdAndUpdate(req.body._id,{img:[req.body.img]}, {new: true})
        if (!dict){
            return res.status(404).send()
        }
        res.send(dict)
    } catch (e) {
        res.status(400).send(e)
    }

});

router.post('/random', async (req, res) => {
    const userId = req.body.userId
    console.log(req.body.userId)
    try {
        const dict = await Dict.aggregate([{ $match: { userId: userId } },{ $sample: { size: 30 } }])
        if (!dict){
            return res.status(404).send()
        }
        res.send(dict)
    } catch (e) {
        res.status(400).send(e)
    }

});


module.exports = router;