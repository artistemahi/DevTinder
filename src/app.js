const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("sever started at port 3000...");
});
app.use("/about/2", (req, res) => {
  res.send("hello from about 2 page");
});
app.use("/about", (req, res) => {
  res.send("this is  from about page");
});
app.use("/profile", (req, res) => {
  res.send("this is  from profile page");
});
app.use("/contact", (req, res) => {
  res.send("this is  from contact page");
});
app.use("/", (req, res) => {
  res.send("hello from homepage");
});