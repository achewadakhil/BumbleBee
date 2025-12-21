import {Router} from "express";
import { validateUser } from "../controllers/authControllers.js";
import { getAllPosts } from "../controllers/getAllPosts.js";
import { getAnAd } from "../controllers/getAnAd.js";

const buyerRouter = Router();

buyerRouter.get("/allPosts",validateUser,getAllPosts);

buyerRouter.get("/ad/:adId",validateUser,getAnAd);

export default buyerRouter;