const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    enum: {
      values: ["ignore", "interested", "accepted", "rejected"],
      message: `{VALUE} is not supported`,
    },
  },
});

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);
module.exports = ConnectionModel;
