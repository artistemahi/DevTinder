const express = require("express");
const { UserAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connection");
const requestRouter = express.Router();

// request send api
requestRouter.post(
  "/request/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
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
