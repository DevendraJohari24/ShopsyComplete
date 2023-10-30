import Blog from "../models/blogModel.js";
import asyncHandler from 'express-async-handler';

// Create a Blog
export const createBlog = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({
        success: true,
        blog
    })
})


// Get all Blogs
export const getAllBlogs = asyncHandler(async(req, res) => {
    const resultPerPage = 20;
    const blogsCount = await Blog.countDocuments();
    const blogs = await Blog.find();
    console.log(blogs);

    res.status(200).json({
        success: true,
        blogs,
        blogsCount
    });
});
