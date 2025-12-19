import express from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vendorRouter from "./routes/vendorRoutes.js";
dotenv.config();


const app = express();

app.use(
    cors({
        origin :"http://localhost:5173",
        exposedHeaders : ["token","role"],
        credentials : true
    })
);

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message : "Hello bro"
    })
});

app.use("/auth",authRouter);

app.use("/v",vendorRouter);

(async ()=>{

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected successfully"))
    .catch(() => console.log("Error while connecting to MONGODB"));

    app.listen(process.env.PORT,()=>console.log("Server is running at port 8080"));
})();