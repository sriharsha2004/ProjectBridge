const model = require("../models/InvestorSchema")

var postcosttoInv = (req,res) => {
    const newdata = new model(req.body);
    newdata.save()
    .then(()=>{
        res.json({msg : "Succesfully"})
    })
    .catch((err) => {
        res.json("Error Occured");
    })
}

var getAllAppeals = (req,res) =>{
    model.find({Entrmail : req.params.mail})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json("Error Occured!!!");
    })
}

module.exports = {
    postcosttoInv,
    getAllAppeals
}