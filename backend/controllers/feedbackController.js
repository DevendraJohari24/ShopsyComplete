import FeedBack from "../models/feedbackModel.js";
import asyncHandler from 'express-async-handler';

// Create a FeedBack
export const createFeedback = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const feedback = await FeedBack.create(req.body);
    res.status(201).json({
        success: true,
        feedback
    })
})


// Get all FeedBack
export const getAllFeedbacks = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const feedbacksCount = await FeedBack.countDocuments();
    const feedbacks = await FeedBack.find();
    res.status(200).json({
        success: true,
        feedbacks,
        feedbacksCount
    });
});