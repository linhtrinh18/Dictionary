let express = require("express");
let axios = require("axios");
let router = express.Router();




router.get("/template", async (req,res) => {
    try {

    } catch(e) {
        res.status(400).send(e)
    }
});






module.exports = router;