const express = require("express");
const { auth, userAuth } = require("./middleware/auth");
const app = express();

app.use(express.json());

// login all user ke liye hoga isliye isme auth middleware nahi lagaya hai
app.use("/user/login",(req,res)=>{
  res.send("login successful");
})
app.use("/user",userAuth);
app.use("/admin",auth);
app.get("/admin/getAllData",(req,res)=>{
   res.send("valid token, data sent");
  
})
app.get("/admin/deleteUser",(req,res)=>{
 
    res.send("valid token, user deleted");
})
app.listen(3000, () => {
  console.log("server started at port 3000...");
});
