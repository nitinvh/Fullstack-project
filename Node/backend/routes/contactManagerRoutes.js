const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/contactManagerController");
const jwt = require('jsonwebtoken');

router.post("/addDetails", Controllers.createUser);

router.post("/signup", Controllers.singnUp);

router.post("/signin",Controllers.singnIn);

router.get("/getDetails", Controllers.fetch);

router.get("/getUserProfile",authorize, Controllers.userProfile);

router.put("/updateDetails/:id",Controllers.update);

router.get("/deactivate",authorize,Controllers.deactivate);

router.post("/activate", Controllers.activate);

router.delete("/deleteDetail/:id", Controllers.delete);

router.post("/upassword",authorize, Controllers.uPassword);


function authorize (req,res,next){
    try{

    let reqtoken = req.headers['authorization'];
    const token = reqtoken.replace("Bearer ", '');
    const verifiedToken = jwt.verify(token, "jamesbond");
    req.token = verifiedToken;
    next();
    return;
    }
    catch(err){
        console.log(err);
        res.send({msg:"you are not authorized",status:false});
    }
}



module.exports = router;
