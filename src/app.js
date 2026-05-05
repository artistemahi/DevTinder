const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// feed api , get all the user from database
app.get("/feed", async (req, res) => {
  try {
    const allData = await UserModel.find();
    res.json(allData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
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
