const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../Models/UserSchema")
const ErrorHandler =require("../Utils/ErrorHandler")
const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    console.log("from isAuthenticateefd.js");//debugging purpose
   
    const token =req.cookies.token;
    console.log(token);
    
    if(!token){
        return next(new ErrorHandler("please login to access this resource"));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decodedData);
    req.user =await User.findById(decodedData.id);
    console.log("this req.user from is Authenticated ")
    console.log(req.user);
    next();
})

module.exports =isAuthenticated;