let express = require("express");
let router = express.Router();
let Dict = require("../models/dictionary");
let {oxfordApi} = require('../apis/oxford')
let {googleApi} = require('../apis/googleTrans')
let {bingImage} = require('../apis/bingImage')
let helper = require('./helper/helper')


// Get all of the Dict
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

router.post('/oxford', async (req, res)=>{
    const response = await oxfordApi(req.body.word)
    res.status(201).send(response);
    // console.log("OXFORD RESPONSE: ", JSON.stringify(response))
    try {
        const dict = await Dict.findById(req.body._id)
    }catch (e) {
        res.status(400).send(e)
    }
})

// FETCH DATA FROM GOOGLE
router.post('/google', async (req, res) => {
    const response = await googleApi(req.body.word)
    const baseFrom = helper.checkBaseform(response.data)
    // console.log('GOOGLE RESPONSE, ' , response.data)
    req.body.word = baseFrom;
    const dict = new Dict(req.body)
    try {
        await dict.save()
        // console.log("DICT: ", {data: dict, })
        res.status(201).send({data: dict, google:response.data});
    }catch(e) {
        res.status(400).send(e)
    }
});

router.post('/bing', async (req, res) => {
    console.log("BING DONE")
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