import { Router } from "express";
import { postAd } from "../controllers/vendorController.js";
import { validateUser } from "../controllers/authControllers.js";

const vendorRouter = Router();

vendorRouter.post("/postAd",validateUser,postAd);


export default vendorRouter;