import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';



export const newOrder = asyncHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
});

// Get Single Order

export const getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if(!order){
        return next(new Error("Order not found with this Id", 404));
    }
  
    res.status(200).json({
        success: true,
        order
    });
})

// Get LoggedIn User Order

export const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});
  
    res.status(200).json({
        success: true,
        orders
    });
})

// Get All Orders -- admin

export const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});



async function updateStock(id, quantity){
    const product = await Product.findById(id);
    
    product.stock =  product.stock - quantity;
    await product.save();
}

// Get Order Status -- admin

export const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new Error(`Order not found with this Is ${req.params.id}`, 404));
    }
    
    if(order.orderStatus === "Delivered"){
        return next(new Error("You have already Delivered this order", 404));
    }
    order.orderItems.forEach(async(o) => {
        await updateStock(o.product, o.quantity);
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    } 

    await order.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
    });
});

//  Delete Order -- Admin
export const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new Error(`Order not found with this Is ${req.params.id}`, 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "Order Deleted Successfully"
    });
});
