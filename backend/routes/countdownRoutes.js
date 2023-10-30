import express from 'express';

import { getAllCountDown, createCountDown } from "../controllers/countdownController.js";

const router = express.Router();


router.route("/").get( getAllCountDown);

router.route("/new").post(createCountDown);



export default router;