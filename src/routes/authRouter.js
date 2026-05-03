const ValidationFn = require("../utils/ValidationFn");
const UserModel = require("../models/user");
const {UserAuth} = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const express = require('express');
const authRouter = express.Router();


// sign up api
authRouter.post("/signup", async (req, res) => {
  try { // validation of data
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
module.exports = authRouter;