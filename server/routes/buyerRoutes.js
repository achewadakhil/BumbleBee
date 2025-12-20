import {Router} from "express";
import { validateUser } from "../controllers/authControllers.js";
import { getAllPosts } from "../controllers/getAllPosts.js";

const buyerRouter = Router();

buyerRouter.get("/allPosts",validateUser,getAllPosts);

export default buyerRouter;