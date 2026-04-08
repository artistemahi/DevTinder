const express = require("express");
const app = express();

app.use(express.json());

app.use("/user", [
(req,res,next )=>{
  // res.send("route 1");
  next();
},
(req,res,next)=>{
  // res.send("route 2");
  next();
},
(req,res,next)=>{
  // res.send("route 3");
  next();
},
(req,res,next)=>{
  // res.send("route 4");
  next();
},]
)

app.listen(3000, () => {
  console.log("server started at port 3000...");
});