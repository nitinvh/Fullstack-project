const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contactManagerSchema = new schema({
    userId:{
        type:Number,
        unique:true,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:String
});

const credentialsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type: String,
        required: true
    },
    active: Boolean
});

const contactManagerModel = mongoose.model("contactManager",contactManagerSchema);
const credentialsModel = mongoose.model("credentialsManager", credentialsSchema);

module.exports = {contactManagerModel, credentialsModel};