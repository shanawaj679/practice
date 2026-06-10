const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.get("/getdata",(req,res)=>{
    res.send("hello world");
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})