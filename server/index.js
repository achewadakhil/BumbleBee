import express from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";


const app = express();

app.use(
    cors({
        origin :"http://localhost:5173",
        exposedHeader : ["token"],
        credentials : true
    })
)

app.use(express.json());



app.get("/",(req,res)=>{
    res.json({
        message : "Hello bro"
    })
});

app.use("/auth",authRouter);

app.listen(8080,()=>console.log("Server is running at server 8080"));