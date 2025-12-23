import express from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vendorRouter from "./routes/vendorRoutes.js";
import buyerRouter from "./routes/buyerRoutes.js";
import { feedBack, feedBackform } from "./controllers/feedbacks.js";
import { validateUser } from "./controllers/authControllers.js";
dotenv.config();


const app = express();

app.use(
    cors({
        origin :"https://694a767b8574640008c6066d--bumble-bee11.netlify.app",
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

app.use("/buy",buyerRouter);

app.post("/feedback", validateUser, feedBack);

app.post("/feedbackform",validateUser, feedBackform);

(async ()=>{

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected successfully"))
    .catch(() => console.log("Error while connecting to MONGODB"));

    app.listen(process.env.PORT,()=>console.log("Server is running at port 8080"));
})();