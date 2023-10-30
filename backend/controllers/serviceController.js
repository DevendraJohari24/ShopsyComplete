import Service from "../models/serviceModel.js";
import asyncHandler from 'express-async-handler';



// Create a Question
export const createService = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const service = await Service.create(req.body);
    res.status(201).json({
        success: true,
        service
    })
})


// Get all Service
export const getAllServices = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const servicesCount = await Service.countDocuments();
    const services = await Service.find();
    res.status(200).json({
        success: true,
        services,
        servicesCount
    });
});

