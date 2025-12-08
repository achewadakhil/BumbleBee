import { Router } from "express";
import { UserSignUp } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup",UserSignUp);

export default authRouter;