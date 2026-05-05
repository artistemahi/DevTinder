const express = require("express");
const { UserAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connection");
const requestRouter = express.Router();
const UserModel = require("../models/user");

// request send api
requestRouter.post(
  "/request/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // validation for status
      const isAllowed = ["interested", "ignore"];
      if (!isAllowed.includes(status)) {
        return res.status(400).json({ error: "invalid status" });
      }
      // check if the request already exists
      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({ error: "request already exists" });
      }

      // user is not sending request to himself
      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .json({ error: "you cannot send request to yourself" });
      }
      // checking if the toUserId is present in database or not
      const toUser = await UserModel.findById(toUserId);
        if (!toUser) { 
            return res.status(400).json({ error: "user not found" });
        }
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({ message: "request sent successfully", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

// request respond api
// ConnectionRequest.post("/request/respond", UserAuth, async (req, res) => {
//     try{

//     }catch(err){
//         res.status(400).json({error: err.message});
//     }
// });

module.exports = requestRouter;
