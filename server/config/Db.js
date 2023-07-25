const mongoose =require("mongoose");

const connectToMongo=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log(" DB connection successfull ");
    })
    
}
module.exports=connectToMongo;