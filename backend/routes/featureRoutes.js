import express from 'express';

import { getAllFeatures, createFeature } from "../controllers/featureController.js";

const router = express.Router();


router.route("/").get(getAllFeatures);

router.route("/new").post(createFeature);



export default router;