const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user");
const ValidationFn = require("./utils/ValidationFn");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());


// sign upapi
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {

  try {
      const { email, password } = req.body;
    const isUserExist = await UserModel.findOne({ email: email });
    if (!isUserExist) {
      throw new Error("Invalid credentials");
    }
    const isPasswodMatch = await bcrypt.compare(password, isUserExist.password);
    if (isPasswodMatch) {
      res.json("Login successful!!!" );
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).end("Error: " + err.message);
  }
});
// get user by email id
app.get("/user", async (req, res) => {
  try {
    const user = await UserModel.find({ email: req.body.email });
    if (user.length === 0) {
      res.status(404).end("user not found with this email id");
      return;
    } else {
      res.json(user); // res.send(JSON.stringify(user));
    }
  } catch (err) {
    res.status(400).end(err.message + "error fetching user data");
  }
});

// feed api , get all the user from database
app.get("/feed", async (req, res) => {
  try {
    const allData = await UserModel.find();
    res.json(allData);
  } catch (err) {
    res.status(400).end(err.message + "error fetching user data");
  }
});

// finding user by id
app.get("/user", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userid);
    if (user.length === 0) {
      res.status(404).end("user not found");
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).end(err.message + "error fetching user data");
  }
});
// deleting the user by id
app.delete("/user", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.body.userid);
    if (user === 0) {
      res.status(404).end("user not found");
    } else {
      res.end("user deleted successfully");
    }
  } catch (err) {
    res.status(400).end(err.message + "error deleting user");
  }
});

// updating the user by id
app.patch("/user/:userid", async (req, res) => {
  const userid = req.params?.userid;
  const data = req.body;
  try {
    const ALLOWUPDATE = ["age", "about", "photoURL", "skills"];
    const isValidOperation = Object.keys(data).every((key) => {
      return ALLOWUPDATE.includes(key);
    });
    if (!isValidOperation) {
      throw new Error("updates are not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("skills should be less than 10");
    }
    const user = await UserModel.findByIdAndUpdate({ _id: userid }, data, {
      runValidators: true,
    });
    res.end("user updated successfully");
  } catch (err) {
    res.status(400).end("error updating user: " + err.message);
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
