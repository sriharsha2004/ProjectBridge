const model = require("../models/ProjectsSchema");

var getAllprojects = (req,res) =>{
    model.find({})
    .then((data)=>{
        console.log(req.user);
        res.json({data : data , mail : req.user.mail});
    })
    .catch((err)=>{
        console.log(err);
        res.json("Error Occured!!!");
    })
}

var getprojectsWithmail = (req,res) =>{
    model.find({mailId : req.params.mail})
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        console.log(err);
        res.json("Error Occured!!!");
    })
}

var postProject = (req,res)=>{
    const newProject = new model(req.body);
    newProject.save()
    .then(()=> res.json({msg : "Succesfully"}))
    .catch((err) => {
        console.log(err);
        res.json("Error Occured") 
    })
}


var updateProject = (req,res) =>{
    const id = req.params.id;
    const newData = req.body;
    model.findByIdAndUpdate(id, newData, { new: true })
    .then((updatedProject) => {
        if(updatedProject)
            res.json("Updated Successfully")
        else 
            res.json("Project Not Found!!!")
    })
    .catch((err) => {
        console.log(err);
        res.json("Error Occured !!!")
    })
}

var deleteProject = (req,res) =>{
    const id = req.params.id;
    model.findByIdAndDelete(id)
    .then((deletedProject) => {
        if(deletedProject) 
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
    getAllprojects,
    getprojectsWithmail,
    deleteProject,
    updateProject,
    postProject
}