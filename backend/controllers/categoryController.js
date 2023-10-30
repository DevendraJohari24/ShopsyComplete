import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';


export const createCategory = asyncHandler(async(req, res, next) => {
    req.body.user = req.user.id;
    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        category
    })
})


// Get all Categories
export const getAllCategories = asyncHandler(async(req, res) => {
    const categoryCount = await Category.countDocuments();
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        categories,
        categoryCount
    });
});


export const getCategoryDetails = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new Error("Category Not Found", 404));
    }
    res.status(200).json({
        success: true,
        category
    });
})

export const getCategoryDetailsByName = asyncHandler(async(req, res, next) => {
    const category = await Category.findOne({name: req.body.name});
    if(!category){
        return next(new Error("Category Not Found", 404));
    }
    res.status(200).json({
        success: true,
        category
    });
})

export const getAllProductsByCategoryName = asyncHandler(async(req, res, next) => {
    const products = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category_details",
            },
        },
        {
            $match: {
                "category_details.name": req.params.categoryName
            }
        }
    ]);
    if(!products){
        return next(new Error("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        products
    });
})