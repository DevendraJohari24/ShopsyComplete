import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type:  String,
        required: [true, "Please Enter Category Name"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter the description"]
    },
    image: {
             public_id: {
                 type: String,
                 required: true,
             },
             url: {
                 type: String,
                 required: true
             }
    },
    user: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;