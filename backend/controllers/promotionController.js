import Promotion from "../models/promotionModel.js";
import asyncHandler from 'express-async-handler';

// Create a Portfolio
export const createPromotion = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const promotion = await Promotion.create(req.body);
    res.status(201).json({
        success: true,
        promotion
    })
})


// Get all Promotions
export const getAllPromotions = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const promotionsCount = await Promotion.countDocuments();
    
    const promotions = await Promotion.find();
    res.status(200).json({
        success: true,
        promotions,
        promotionsCount
    });
}
);
