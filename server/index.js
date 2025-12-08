import express from "express";


const app = express();

app.get("/",(req,res)=>{
    res.json({
        message : "Hello bro"
    })
});

app.listen(8080,()=>console.log("Server is running at server 8080"));