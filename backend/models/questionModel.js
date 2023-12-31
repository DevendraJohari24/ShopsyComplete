import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    title: {
        type:  String,
        required: [true, "Title should not be empty"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description should not be empty"]        
    },
    createdBy: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;