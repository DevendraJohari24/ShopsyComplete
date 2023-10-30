import express from 'express';
import { getAllQuestions, createQuestion } from "../controllers/questionController.js";

const router = express.Router();


router.route("/").get(getAllQuestions);

router.route("/new").post( createQuestion);



export default router;