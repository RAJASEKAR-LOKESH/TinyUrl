const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login route
router.post('/login',async(req,res)=>{
    try {
        let user = await Users.findOne({ email: req.body.email });

        if(user.status=='inactive'){
            return res.status(403).json({
                message: 'Your account is inactive. Please click the activate account button in you email.'
            });
        }

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const jwtData = { _id: user._id, email: user.email };
        const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "30m" });
        
        res.json({ token });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;