const express = require("express");
const router = express.Router();
const bp= require("body-parser");

router.use(bp.json());
router.use(logger);

router.post("/login",(req,res)=>{
    const data = req.body;
    res.setHeader("content-type","dasboard/html");
    res.status(301).send(JSON.stringify({mes:"successfull"}));

});

function logger(req,res,next){
    const data = req.body;

    if(data.fname==="nitin" && data.pwd==="123"){
        next();
        return;
    }

    else{
        res.status(404).send(JSON.stringify({mes:"error"}));
    }


}

module.exports= router;
