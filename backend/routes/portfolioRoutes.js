import express from 'express';

import { getAllPortfolios, createPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();


router.route("/").get(getAllPortfolios);

router.route("/new").post(createPortfolio);



export default router;