const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

router.get("/dashboard",(req,res)=>{
    res.send(JSON.stringify({mess:"It's working"}));
})

module.exports= router;