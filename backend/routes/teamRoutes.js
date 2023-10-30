import express from 'express';
import { getAllTeams, createTeam } from "../controllers/teamController.js";

const router = express.Router();


router.route("/").get(getAllTeams);

router.route("/new").post(createTeam);

export default router;