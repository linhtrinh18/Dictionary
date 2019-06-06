let express = require("express");
let router = express.Router();
let Dict = require("../models/dictionary");
let {oxfordApi} = require('../apis/oxford')
let {googleApi} = require('../apis/googleTrans')
let {bingImage} = require('../apis/bingImage')
let {spellCheck} = require('../apis/spellCheck')

let helper = require('./helper/helper')


router.get('/dict/:userId', async (req, res)=>{
    const userId = req.params.userId
    // console.log(req.params)
    try {
        const dict = await Dict.find({userId})
        console.log("dict", dict)
        if (!dict){
            return res.status(404).send()
        }
        res.send(dict)
    } catch (e) {
        console.log("error")
        res.status(400).send(e)
    }
})

router.get('/review-page/:page/:userId', async (req, res)=>{
    const userId = req.params.userId
    const currentPage= req.params.page
    console.log(req.params)
    try {
        const dict = await Dict.paginate({userId}, { page: currentPage, limit: 5, sort: {$natural:-1 } })
        res.send(dict)
    } catch (e) {
        console.log("error")
        res.status(400).send(e)
    }
})




router.post('/oxford', async (req, res)=>{
    try {
        const response = await oxfordApi(req.body.word)
        res.status(201).send({oxford: response});
        console.log(JSON.stringify(response))
        const oxfordData = helper.renderEnglishMeaning(response)
        const dict = await Dict.findByIdAndUpdate(req.body._id,{en: oxfordData.oxfordData, pro:oxfordData.phoneticSpelling, aud:oxfordData.audioFile }, {new: true})
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/update', async (req, res)=>{
    console.log("hit Update route")
    try {
        console.log("BODY:", JSON.stringify(req.body.data))
        const dict = await Dict.findById(req.body.data._id)
        let updates = Object.keys(req.body.data)
        updates.forEach((update)=> {
            if(Array.isArray(dict[update])){
                dict[update] = dict[update].concat(req.body.data[update])
            }
        })
        await dict.save()
        res.send("Successfully update")
        // console.log("DICT AFTER MODIFY", dict)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/google', async (req, res) => {
    const response = await googleApi(req.body.word)
    const baseFrom = helper.checkBaseform(response.data)
    // Check valid word
    if(response.data.dict) {
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
    console.log("spellCheck(req.body.word)", spellCheck(req.body.word))
    const spellCheckResonse = await spellCheck(req.body.word)
    res.status(201).send({google: spellCheckResonse});
    }
});

router.post('/bing', async (req, res) => {
    const response = await bingImage(req.body.word)
    // console.log(response)
    res.status(201).send(response);
    // req.body.word = baseFrom;
    // const dict = new Dict(req.bod
    // try {
    //     await dict.save()
    //     res.status(201).send(dict);
    // }catch(e) {
    //     res.status(400).send(e)
    // }
});


router.post('/bingimage', async (req, res) => {
    // console.log("BING IMAGE", req.body)
    const _id = req.body.userId
    try {
        const dict = await Dict.findByIdAndUpdate(req.body._id,{img:[req.body.img]}, {new: true})
        if (!dict){
            return res.status(404).send()
        }
        res.send(dict)
    } catch (e) {
        console.log("error")
        res.status(400).send(e)
    }

});



// Get individual Dict
// router.get('/dict/:id', async (req, res)=>{
//     const _id = req.params.id
//     // console.log(req.params)
//     try {
//         const dict = await Dict.findById(_id)
//         if (!dict){
//             return res.status(404).send()
//         }
//         res.send(dict)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


// router.patch('/streams/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['word', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const dict = await Dict.findById(req.params.id)
//         updates.forEach((update)=> dict[update] = req.body[update])
//         await dict.save()
//         if (!dict) {
//             return res.status(404).send()
//         }
//         res.send(dict)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/streams/:id',async (req, res) => {
//     try {
//         const dict = await Dict.findOneAndDelete(req.params.id)
//         if (!dict) {
//             res.status(404).send()
//         }
//         res.send(dict)
//     } catch (e) {
//         res.status(500).send()
//     }
// })



module.exports = router;