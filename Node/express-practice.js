 const express = require("express");
 const server = express();
 const bp = require("body-parser");

 server.use(bp.json());
 let arr=[]

 server.get('/dashboard',(req,res)=>{
    res.send("Hi,it's working");
 });

server.post('/dashboard',(req,res)=>{
    const data = req.body;
    arr.push(data);
    res.send(JSON.stringify(arr));
});



 server.listen(3001,()=>console.log("server is up"));