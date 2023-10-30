import Team from "../models/teamModel.js";
import asyncHandler from 'express-async-handler';


// Create a Team
export const createTeam = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const team = await Team.create(req.body);
    res.status(201).json({
        success: true,
        team
    })
})


// Get all Teams
export const getAllTeams = asyncHandler(async(req, res) => {
    const resultPerPage = 4;
    const teamsCount = await Team.countDocuments();
    const teams = await Team.find();
    res.status(200).json({
        success: true,
        teams,
        teamsCount
    });
}
);
