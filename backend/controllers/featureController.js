import Feature from "../models/featureModel.js";
import asyncHandler from 'express-async-handler';


// Create a Feature
export const createFeature= asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const feature = await Feature.create(req.body);
    res.status(201).json({
        success: true,
        feature
    })
})


// Get all Features
export const getAllFeatures = asyncHandler(async(req, res) => {
    const featuresCount = await Feature.countDocuments();
    const features = await Feature.find();
    res.status(200).json({
        success: true,
        features,
        featuresCount
    });
});

