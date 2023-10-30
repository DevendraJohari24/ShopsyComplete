import CountDown from "../models/countdownModel.js";
import asyncHandler from 'express-async-handler';


// Create a Countdown
export const createCountDown = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const countdown = await CountDown.create(req.body);
    res.status(201).json({
        success: true,
        countdown
    })
})


// Get all Countdowns
export const getAllCountDown = asyncHandler(async(req, res) => {
    const resultPerPage = 1;
    const countDownCount = await CountDown.countDocuments();
    const countdown = await CountDown.find();
    res.status(200).json({
        success: true,
        countdown,
        countDownCount
    });
}
);
