const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto =require('crypto');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    required: [true, "please enter your number"],
  },
  phone: {
    type: Number,
    required: [true, "please enter your number"],
    maxLength: [10],
  },
  Email: {
    type: String,
    required: [true, "please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "enter the password"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "please enter your password"],

    minLength: [5, "pasword should be min 5 characters"],
  },
  avator: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,

  resetPasswordExpire: Date,
});
//hashing the password 
UserSchema.pre("save",async function(next){
  if (!this.isModified("password")){//usefull when the password is not changed while updating the profile
    next();
  }
  this.password=await bcrypt.hash(this.password,10);

})

//JWT TOKEN

UserSchema.methods.getJwtToken=function(){
    // console.log("from getJwttoken");    
    // console.log(this._id);    //for testing
    // console.log(process.env.JWT_SECRET);    
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })

}

//genrating password reset token

UserSchema.methods.getresetPaswordToken=function(){
  const resetToken =crypto.randomBytes(20).toString("hex");
  console.log(resetToken);
  //adding algorith to hash the token
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   
   this.resetPasswordExpire=Date.now()+15*60*1000;
console.log("this is get reset token function");

     
   
   return resetToken 
}
UserSchema.methods.comparePassWord=async function(enteredPassword){
        
  return await  bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
