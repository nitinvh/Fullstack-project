const express = require("express");
const server = express();
const GetRequest = require("./getRequest");
const PostRequest = require("./postRequest");

server.use(GetRequest);
server.use(PostRequest);

server.listen(3001,()=> console.log("server hit", __dirname));