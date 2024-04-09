require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require('multer');

const app = express();

const validateUser = require("./routes/validateUser");
const handleprojects = require("./routes/handleprojects");
const handleIdeas = require("./routes/handleIdeas")
const handleEntrCost = require("./routes/handleEntrCost")
const handleInvestments = require("./routes/handleInvestments");
const getDatafromToken = require("./routes/getdatafromtoken");
const handleforgetpassword = require("./routes/handleforgetpassword")

app.use(morgan("dev"))
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT_NO,(req,res)=>{
        console.log("db connected Succesfully");
        console.log("Server is listening to port " + process.env.PORT_NO);
    });
})
.catch((err)=>{
    console.log(err);
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.json('Error Occured');
    }
    const filename = req.file.filename;
    // console.log(filename);
    res.json({"filename" : filename , "msg" : "Succesfully"});
});

app.use("/forgetpwd",handleforgetpassword)
app.use("/verifytoken",getDatafromToken)
app.use("/validate",validateUser);
app.use("/Projects",handleprojects);
app.use("/Ideas",handleIdeas);
app.use("/EntrtoInv",handleEntrCost);
app.use("/Investments",handleInvestments);

