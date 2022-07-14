const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const JWT_SECRET="Rohitisveryh@ppy";
const fetchuser = require("../midelware/fetchuser");

//Route1-Create user   api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt)
      
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      sucess=true
      res.json({sucess,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
  }
);


//Route2 -Authenticate user  api/auth/login
router.post(
  "/login",[
    
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  
  async (req, res) => {
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      let user=await User.findOne({email});
      if(!user){
        sucess=false
        return res.status(400).json({error:"Please try to login with correct email"});
      }

      const passwordCompare= await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        sucess=false
        return res.status(400).json({error:"Please try to login with correct pass"});
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      sucess=true
      res.json({sucess,authtoken});
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  })


//Route3-Get User details  api/auth/getuser
router.get(
  "/getuser",fetchuser,
  
  async (req, res) => {
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server error");
}})
module.exports = router;
