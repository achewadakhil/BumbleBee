import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup",userSignUp);

authRouter.post("/signin",userSignIn);

export default authRouter;