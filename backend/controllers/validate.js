const usersmodel = require("../models/signupSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// const saltrounds = process.env.SALT_ROUNDS

var signup = (req, res) => {
    console.log(process.env.SALT_ROUNDS);
    bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS)).then((encryptedpassword) => {
        req.body.password = encryptedpassword;
        var user = new usersmodel(req.body);
        console.log(req.body);
        return user.save();
    })
    .then(() => {
        res.json("Succesfully");
    })
    .catch((error) => {
        console.error(error);
        res.json("Error Occurred");
    });
};

var signin = (req, res) => {
    usersmodel.find({ mailId: req.body.mailId })
        .then((data) => {
            if (data.length !== 0) {
                bcrypt.compare(req.body.password, data[0].password, (err, isvalid) => {
                    if (err) {
                        console.log(err);
                        res.json("Internal Server Error");
                    } else {
                        if (isvalid){
                            const token = jwt.sign({ mail: req.body.mailId , role : req.body.role}, process.env.JWT_SECRET, { expiresIn: '300s' });
                            res.json({"token" : token , msg : "Succesfully"})
                            // res.json("Succesfully");
                        }
                        else res.json("Invalid User");
                    }
                });
            } else {
                res.json("Invalid User");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json("Internal Server Error");
        });
    // usersmodel.find({ mailId: req.body.mailId , password : req.body.password })
    // .then(()=>{
    //     res.json("Succesfully")
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.json("Error Occured");
    // })
}


module.exports = {
    signin,
    signup
}