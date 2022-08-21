const express = require("express");
const server = express();
const bp = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const contactManagerRoute = require("./routes/contactManagerRoutes");

server.use(bp.json());
server.use(cors());
server.use("/",contactManagerRoute);
mongoose.connect("mongodb://localhost:27017/backend").then((res)=>console.log("DB connected successfully!")).catch((err)=> console.log(err));



server.listen(3001,()=> console.log("server is started!"));