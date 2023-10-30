import express from 'express';

import { getAllCategories, createCategory, getAllProductsByCategoryName } from "../controllers/categoryController.js";

const router = express.Router();


router.route("/categories").get( getAllCategories);

router.route("/categories/:categoryName/products").get(getAllProductsByCategoryName);

router.route("/admin/category/new").post(createCategory);


export default router;