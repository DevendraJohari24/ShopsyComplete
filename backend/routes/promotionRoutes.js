import express from 'express';
import { getAllPromotions, createPromotion } from "../controllers/promotionController.js";

const router = express.Router();


router.route("/").get(getAllPromotions);

router.route("/new").post(createPromotion);

export default router;