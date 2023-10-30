import Question from "../models/questionModel.js";
import asyncHandler from 'express-async-handler';


// Create a Question
export const createQuestion = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const question = await Question.create(req.body);
    res.status(201).json({
        success: true,
        question
    })
})


// Get all Questions
export const getAllQuestions = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const questionsCount = await Question.countDocuments();
    const questions = await Question.find();
    res.status(200).json({
        success: true,
        questions,
        questionsCount
    });
}

);