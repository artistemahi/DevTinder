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
},{timestamps: true});
ConnectionSchema.index({ fromUserId: 1, toUserId: 1 });

ConnectionSchema.pre("save", async function(next){
  const connnection = this;
  if(connection.toUserId.equals(connection.fromUserId)){
    throw new Error("you cannot send request to yourself");
  }
})

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);
module.exports = ConnectionModel;
