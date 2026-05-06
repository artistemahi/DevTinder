const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connection.js");
// Get all the pending friend requests for the loggedIn user
userRouter.get("/user/requests/received", UserAuth, async (req, res) => {
  try {
    // finding all the pending request for the loggedIn user
    const loggedInUser = req.user;
    const ConnectionRequestData = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoURL about");
    res.json({
      message: "Data fetched successfully",
      data: ConnectionRequestData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all the connections(accepted) for the loggedIn user
userRouter.get("/user/connections", UserAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName photoURL about")
      .populate("toUserId", "firstName lastName photoURL about");
      const data = connections.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId;
        }
        else{
            return row.fromUserId;
        }
      });
      res.json({
        message: "Data fetched successfully",
        data: data,
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
