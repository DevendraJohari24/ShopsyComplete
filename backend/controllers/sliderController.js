import Slider from "../models/sliderModel.js";
import asyncHandler from 'express-async-handler';

// Create a Question
export const createSlider = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const slider = await Slider.create(req.body);
    res.status(201).json({
        success: true,
        slider
    })
})


// Get all Service
export const getAllSliders = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const slidersCount = await Slider.countDocuments();
    const slideHeader = await Slider.find();
    res.status(200).json({
        success: true,
        slideHeader,
        slidersCount
    });
}
);
