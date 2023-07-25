const sendToken=(user,statuscode,res)=>{//creating token and saving in cookie
    const token =user.getJwtToken();

    //options for cookie
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE* 24*60*60*1000
        ),
        httpOnly:true
    };
    res.status(statuscode).cookie("token",token,options).json({
success:true,
message:"password changed succesfully",
user,
token
    });

}

module.exports =sendToken;