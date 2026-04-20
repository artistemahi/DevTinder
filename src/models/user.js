const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});
const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel;
// or you can do like this  , module.exports = mongoose.model('user', userSchema)
