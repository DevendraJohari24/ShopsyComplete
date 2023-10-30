import express from 'express';
import { getAllBlogs, createBlog } from "../controllers/blogController.js";

const router = express.Router();


router.route("/").get( getAllBlogs);

router.route("/new").post(createBlog);



export default router;