const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ISchema = new Schema({
    studentname : {
        type : String,
        required : true
    },
    entrname : {
        type : String,
        required : true
    },
    projectId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    IdeaId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    projectName : {
        type : String,
        required : true
    },
    projectDescription : {
        type : String,
        required : true
    },
    projectIdea : {
        type : String,
        required : true
    },
    studentmail : {
        type : String,
        required : true
    },
    Entrmail : {
        type : String,
        required : true
    },
    investormail : {
        type : String,
        required : true
    },
    estimatedcost : {
        type : String,
        required : true
    },
    ImageUrl : {
        type : String,
        default : '/images/DefaultImage.png'
    },
    status : {
        type : String,
        default : "pending"
    }
} , {timestamps : true})

const investorSchema = mongoose.model("projectinvest",ISchema);

module.exports = investorSchema;

