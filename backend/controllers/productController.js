import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from 'express-async-handler';


// Create Product -- Admin
export const createProduct = asyncHandler(async(req, res, next) => {
    req.body.createdBy = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})


// Get all Products
export const getAllProducts = asyncHandler(async(req, res) => {
    const resultPerPage = 20;
    const productCount = await Product.countDocuments();
    const products = await Product.find().populate('category');
    console.log("Products");
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// // Get All Products By Category
export const getAllProductsGroupByCategory = asyncHandler(async(req, res) => {
    const products = await Product.aggregate([
        {
            $group: {
                _id: {category: "$category"},
                products: { $push : "$$ROOT" }
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "_id.category",
                foreignField: "_id",
                as: "category_details"
            }
        }
    ])


    res.status(200).json({
        success: true,
        products,
    });
});

//  Get Product Details
export const getProductDetails = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        return next(new Error("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});

//  Update Product -- Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new Error("Product Not Found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        rundValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
})


// Delete Product -- Admin
export const deleteProduct = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new Error("Product Not Found", 404));
    }

        await Product.deleteOne({
            _id: product._id,
        });

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });
})


// Create New Review or Update the review
export const createProductReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id);
    
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        }); 
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg+=rev.rating
    });

    product.ratings =  avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Rating Created Successfully"
    })
})

// Get all reviews of a product

export const getProductReviews = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new Error("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
})

// Delete reviews of a product

export const deleteReview = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new Error("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
    
    let avg=0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    
    const numOfReviews = reviews.length;


    await product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
       message: "Deleted Review Successfully"
    });
})
