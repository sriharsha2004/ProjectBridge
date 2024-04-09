const mongoose = require("mongoose");

const Schema = mongoose.Schema

const pSchema = new Schema({
    Projectname : {
        type : String,
        required : true
    },
    mailId : {
        type : String,
        required : true
    },
    industry : {
        type : String,
        required : true
    },
    projectDescription : {
        type : String,
        required : true
    },
    posted : {
        type : String,
        default : "pending"
    },
    imageUrl : {
        type : String,
        default : '/images/DefaultImage.png'
    }
} , {timestamps : true})

const projectSchema = mongoose.model( "project" , pSchema)

module.exports = projectSchema;