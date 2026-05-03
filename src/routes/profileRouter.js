const express = require ('express');
const profileRouter = express.Router();
const UserModel = require("../models/user");
const {UserAuth} = require("../middleware/auth");

// profile
profileRouter.get("/profile", UserAuth, async (req, res) => {
try{
  // const user = req.user;
  const {user} = req;
  if(!user){
    res.end("please login again")
  }
  else{
    res.end("Logged in user: " + user.firstName);
  }
}   catch (err) {
    res.status(400).end("Error: " + err.message);
  }
})


module.exports = {profileRouter};