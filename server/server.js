const express = require("express");

const app =require("./app")
app.use(express.json())

console.log("this is server");
app.get('/', (req, res) => {
    res.send('hello  world')
  })
  
app.listen(5000,()=>{
    console.log("server is listening at port := ",5000);
});


