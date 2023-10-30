import express from 'express';

import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/order/new").post( newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/order/me").get( myOrders);

router.route("/admin/orders").get( getAllOrders);

router.route("/admin/order/:id").put( updateOrder).delete( deleteOrder);

export default router;