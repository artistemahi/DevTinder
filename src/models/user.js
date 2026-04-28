const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim:true,
  },
  lastName: {
    type: String,
    maxlength:30,
      trim:true,
  },
  email: {
    type: String,
    Lowercase:true,
    required: true,
    unique: true,
    trim:true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error ("gender is not valid");
      }
    }
  },
  skills: {
    type: [String],
  },
  photoURL: {
    type: String,
    default: "https://avatar-placeholder.iran.liara.run/",
    validate(value){
      if(!Validator.isURL(value)){
        throw new Error("invalid url");
      }
    }
  },
  about:{
    type: String,
    default: "Hey there! I am using DevTinder.",
  }
}, {timestamps:true});

userSchema.methods.getJWTToken = async function(){
  try{
     const user = this;
      const token = jwt.sign({ id: user._id }, "Hare Krishna",);
      return token;
  }catch(err){
    throw new Error("Error generating JWT token: " + err.message);
  }
}
userSchema.methods.ValidatePassword = async function(passwordInputByUser){
  try{
    const user = this;
    const hashedPassword = user.password;
    const isPassword = await bcrypt.compare(passwordInputByUser, hashedPassword);
    if(isPassword){
      return true;
    }
  } catch (error) {
    throw new Error("Invalid password");

  }
}
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
// or you can do like this  , module.exports = mongoose.model('user', userSchema)
