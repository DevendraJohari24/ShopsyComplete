import Portfolio from "../models/portfolioModel.js";
import asyncHandler from 'express-async-handler';


// Create a Portfolio
export const createPortfolio = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({
        success: true,
        portfolio
    })
})


// Get all Portfolios
export const getAllPortfolios = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const portfoliosCount = await Portfolio.countDocuments();
    const portfolio = await Portfolio.find();
    res.status(200).json({
        success: true,
        portfolio,
        portfoliosCount
    });
});

