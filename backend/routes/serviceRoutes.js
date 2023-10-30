import express from 'express';
import { getAllServices, createService } from "../controllers/serviceController.js";

const router = express.Router();


router.route("/").get(getAllServices);

router.route("/new").post(createService);

export default router;