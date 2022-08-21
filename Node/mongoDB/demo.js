const express = require("express");
const server = express();
const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const bp = require("body-parser");

server.use(bp.json());

mongoose.connect("mongodb://localhost:27017/mongooseDemo").then((res)=> console.log("connected successfully")).catch((err)=>console.log(err));

const contactSchema= new Schema({
    userId:{
        type:Number,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const contactModel=mongoose.model("contact",contactSchema);

server.post("/demoDB",(req,res)=>{
    const data= req.body;
    console.log(data);
    contactModel.create({
        userId:data.userId,
        name:data.name
    }).then((result)=>res.send("created successfully")).catch((err)=>res.send(err));
})

server.listen(3001,()=>console.log("server started"))

