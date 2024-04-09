const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    const token = req.headers.authorization;
    // console.log(req.headers.authorization);
    if (!token) {
        return res.json({ msg: 'Token Not found' });
    }
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.json({ msg: 'Invalid token' });
        }
        res.json({msg:"Success",decoded});
    })
})

module.exports = router;