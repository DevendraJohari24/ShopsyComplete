import express from 'express';
import { createSlider, getAllSliders } from "../controllers/sliderController.js";

const router = express.Router();


router.route("/").get(getAllSliders);

router.route("/new").post(createSlider);

export default router;