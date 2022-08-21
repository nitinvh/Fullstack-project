const {contactManagerModel, credentialsModel} = require("../models/contactManager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "jamesbond";

const Controllers = {};

Controllers.singnUp = async function (req,res){
    const data = req.body;
    try{
        const user = await credentialsModel.findOne({email:data.email});
        if(user){
            res.status(404).send({msg:"user already exists", status:false});
        }
        else{
            const hashedpwd = await bcrypt.hash(data.password,5);
            const result=await credentialsModel.create({
                name: data.name,
                email:data.email,
                password:hashedpwd,
                city: data.city,
                active: true
            })
            res.status(201).send({msg:"signup successfull",status:true});
        }
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }
}

Controllers.singnIn = async function (req,res){
    try{
        const data = req.body;
        const user = await credentialsModel.findOne({email:data.email});
        console.log(user);
        if(user){
            if(user.active){
                const comparedHash = await bcrypt.compare(data.password, user.password);
                if(comparedHash){
                    const getToken = jwt.sign({email:data.email}, privateKey, {expiresIn:'2h'});
                    res.status(200).send({msg:"Login successful",status:true, token:getToken});
                }
                else{
                    res.status(404).send({msg:"password incorrect", status:false});
                }
            }
            else{
                res.status(400).send({msg:"Activate your account to login", status:false});
            }
        }
        else{
            res.status(404).send({msg:"user doesn't exist, please sign-up",status:false});
        }
    }
    catch(err){
        res.status(404).send({msg:"Error occured", status:false, err:err});
    }
}

Controllers.userProfile = async function (req,res){
    try{
        const userData = await credentialsModel.findOne({email: req.token.email},{password:0});
        res.send({profileData:userData,msg:"successfull", status: true});
    }
    catch(err){
        console.log(err);
        res.send({err:err, msg: "failed to fetch userdata", status: false});
    }

}

Controllers.uPassword = async function(req,res){
    const data = req.body;
    try{
        const hashedpwd = await bcrypt.hash(data.password,5);
        const updated = await credentialsModel.findOneAndUpdate({email: req.token.email},{password:hashedpwd});
        if(updated){
            res.send({msg:"updated successfully", status: true});
        }
        else{
            res.send({msg:"updated not successful", status: false});
        }
    }
    catch(err){
        console.log(err);
        res.send({msg:"something went wrong", status:false,  err:err});
    }
}

Controllers.deactivate = async function(req,res){
    try{
        const result = await credentialsModel.findOneAndUpdate({email: req.token.email},{active:false},{upsert: true});
        res.send({msg:"deactivated succefully",status: true})
    }
    catch(err){
        console.log(err);
        res.send({err:err, msg: "failed to deactivate", status: false});
    }
}

Controllers.activate = async function(req,res){
    try{
        const data = req.body;
        const user = await credentialsModel.findOne({email:data.email});
        const comparedHash = await bcrypt.compare(data.password, user.password);
        if(comparedHash){
            const result = await credentialsModel.findOneAndUpdate({email:data.email},{active:true},{upsert: true});
            res.send({msg:"activated succefully",status: true})
        }
        else{
            res.send({msg:"wrong password", status:false});
        }
       
    }
    catch(err){
        console.log(err);
        res.send({err:err, msg: "failed to activate", status: false});
    }
}

Controllers.createUser =function (req,res){
    const data=req.body
contactManagerModel.create({
    userId:data.userId,
    fname:data.fname,
    email:data.email,
    role:data.role
}).then((result)=>res.send("created successfully")).catch((err)=>res.send(err))
}

Controllers.fetch =async function (req,res){
    try{
        const result = await contactManagerModel.find({});
        res.send(result);
    }
    catch(err){
        res.send(err);
    }
    //contactManagerModel.find({}).then((result)=>res.send(result)).catch((err)=>console.log(err));
}

Controllers.update = async function (req,res){
    const data = req.body;
    const id = req.params.id
    try{
        const result = await contactManagerModel.updateOne({userId:id},data);
        res.send(result);
    }
    catch(err){
        res.send(err);
    }
}

Controllers.delete = async function (req,res){
    const id = req.params.id;
    try{
        const result = await contactManagerModel.deleteOne({userId:id});
        res.send(result);
    }
    catch(err){
        res.send(err);
    }
}
module.exports = Controllers;