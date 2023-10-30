import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
    image:   {
        public_id: {
            type: String,
            required: [true, "Public Id of Image should not be empty"],
        },
        url: {
            type: String,
            required: [true, "URL of Image should not be empty"]
        }
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

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;