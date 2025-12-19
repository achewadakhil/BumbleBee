import { Router } from "express";
import { postAd } from "../controllers/vendorController.js";

const vendorRouter = Router();

vendorRouter.post("/postAd",postAd);


export default vendorRouter;