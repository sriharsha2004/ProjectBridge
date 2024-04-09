const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ISchema = new Schema({
    name : {
        type : String,
        required : true
    },
    projectId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    projectTitle:{
        type : String,
        required : true
    },
    projectDescription : {
        type : String,
        required : true
    },
    mailId : {
        type : String,
        required : true
    },
    smailId : {
        type : String,
        required : true
    },
    Idea : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : "/images/IdeaManagement.jpg"
    }
} , {timestamps : true})

const Ideamodel = mongoose.model("idea",ISchema);

module.exports = Ideamodel;