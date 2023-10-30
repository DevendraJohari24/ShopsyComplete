import express from 'express';

import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/new").post( createProduct);

router.route("/product/:id").put( updateProduct);

router.route("/product/:id").delete( deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review/new").put(createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(deleteReview);


export default router;