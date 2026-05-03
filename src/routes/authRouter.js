const {ValidationFn} = require("../utils/ValidationFn");
const UserModel = require("../models/user");
const {UserAuth} = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const express = require('express');
const authRouter = express.Router();


// sign up api
authRouter.post("/signup", async (req, res) => {
  try { // validation of data
    // if the user is already signed up with the same email then we will throw an error
    const isUserExist = await UserModel.findOne({email:req.body.email});
    if(isUserExist){
      throw new Error("You are already signed up with this email, please login instead");
    }
  ValidationFn(req);
  const { firstName, lastName, email, password } = req.body;
  // encryption  of password
  const hash = await bcrypt.hash(password, 10); // this is  a promise so we need to use await here and also we need to make the function async
  const HashedPassword = hash;
  // save the data in database
  const user = new UserModel({
    firstName,
    lastName,
    email,
    password: HashedPassword,
  });
    await user.save();
    res.end("user signed up successfully");
  } catch (err) {
    res.status(400).end("Error: " + err.message);
  }
});

// login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await UserModel.findOne({ email: email });
    if (!isUserExist) {
      throw new Error("Invalid credentials");
    }
    const isPasswodMatch = await isUserExist.ValidatePassword(password);
    if (isPasswodMatch) {
      // jwt token can be generated here and send to client for authentication and authorization
      const token = await isUserExist.getJWTToken();

      // cookie
      res.cookie("token", token);

      res.json("Login successful!!!" );
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).end("Error: " + err.message);
  }
});


// logout api 
authRouter.post("/logout",async (req, res)=>{
  try{
    res.clearCookie("token");
    res.end("Logout successful!!!");
  }catch(err){
    res.status(404).end("Error:"+err.message);
  }
} )
module.exports = authRouter;