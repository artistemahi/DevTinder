const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user");
const app = express();
app.use(express.json());

// sign dummy api 
app.post("/signup",  async (req, res)=>{
  const data = req.body;
  const userObj = data;
  //{
  // //   firstName: "keshav",
  // //   lastName: "Kumar",
  // //   email: "keshav@gmail.com",
  // //   password: "password1234",
  // //   age: 25,
  // //   gender: "Male"
  //}
  const user = new UserModel(userObj);
  try{
    await user.save();
  res.end("user signed up successfully");
  }
  catch(err){
    res.status(400).end(err.message+"error signing up user");
  }
  })
connectDB()
  .then(() => {
    console.log("connected to database");

    app.listen(3000, () => {
      console.log("server started at port 3000...");
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });