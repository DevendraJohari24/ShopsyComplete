import express from 'express';


import { getAllFeedbacks, createFeedback } from "../controllers/feedbackController.js";

const router = express.Router();


router.route("/").get(getAllFeedbacks);

router.route("/new").post(createFeedback);



export default router;