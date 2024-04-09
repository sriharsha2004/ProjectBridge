const model = require("../models/InvestorSchema");

var getAllinvestoppor = (req,res) =>{
    model.find({investormail : req.params.mail})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json("Error Occured!!!")
    })
}

var updatestatus = (req,res) =>{
    model.findByIdAndUpdate(req.params.id,{$set : {status : "complete"}},{new : true})
    .then((data)=>{
        res.json(data);
    })
    .catch((err) => {
        res.json("Error Occured!!!")
    })
}

var getAllstudents = (req,res) =>{
    model.find({studentmail : req.params.mail})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json("Error Occured!!!")
    })
}

var getAllEntrepreneurs = (req,res) => {
    model.find({Entrmail : req.params.mail})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json("Error Occured!!!")
    })
}

module.exports = {
    getAllinvestoppor,
    updatestatus,
    getAllstudents,
    getAllEntrepreneurs
}