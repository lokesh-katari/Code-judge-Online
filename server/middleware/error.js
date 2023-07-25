const ErrorHandler=require("../Utils/ErrorHandler")


module.exports=(err,req,res,next)=>{
        err.statuscode  =err.statuscode||500;
        err.message=err.message || "Internal server error";
        if (err.name === "CasteError"){
                const message=`Resource not found .Invalid :${err.path}`;
                err= new ErrorHandler(message,400);
                
        }
        
        //duplicate key error in mongoose
        
        if(err.code ===11000){
                const message=`Duplicate${Object.keys(err.keyValue)} Entered`;
                err= new ErrorHandler(message,400);

        }
        //JWT Error
        if(err.name ==="jsonWebTokenError"){
                const message="Invalid Json web Token provided";
                err= new ErrorHandler(message,400);

        }
        if(err.name ==="TokenExpiredError"){
                const message="Expired Json web Token provided";
                err= new ErrorHandler(message,400);

        }
        res.status(err.statuscode).json({success:false,
        error:err.message});
};