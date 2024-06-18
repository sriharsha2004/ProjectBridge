const model = require("../models/StudentIdeasSchema")

var uploadIdea = (req,res) =>{
    const newIdea = new model(req.body);
    newIdea.save()
    .then(()=>{
        res.json({msg : "Succesfully"});
    })
    .catch((err) =>{
        console.log(err);
        res.json("Error Occured");
    })
}

const getIdeas = (req, res) => {
    const  mailId  = req.params.mail;
    model.find({ smailId : mailId }).sort({createdAt : -1})
        .then(ideas => {
            console.log(ideas);
            res.json(ideas)
        })
        .catch(err => {
            console.log(err);
            res.json("Error Occured");
        });
};

var getIdeasformail = (req,res) =>{
    model.find({mailId : req.params.mail}).sort({createdAt : -1})
    .then(ideas => {
        res.json(ideas)
    })
    .catch(err => {
        console.log(err);
        res.json("Error Occured");
    });
}

var deleteIdea = (req,res) => {
    model.findByIdAndDelete(req.params.id)
    .then((deletedIdea) => {
        if(deletedIdea) 
            res.json("Deleted Successfully")
        else 
            res.json("Not Found!!!");
    })
    .catch((err) => {
        console.log(err);
        res.json("Error Occured !!!")
    })
}

module.exports = {
    uploadIdea,
    getIdeas,
    getIdeasformail,
    deleteIdea
}