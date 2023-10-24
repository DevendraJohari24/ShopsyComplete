const mongoose = require("mongoose");

const promotionSchema = mongoose.Schema({
    title: {
        type:  String,
        required: [true, "Title should not be empty"],
        trim: true,
    },
    subtitle: {
        type: String,
        required: [true, "Subtitle should not be empty"],
        trim: true,   
    },
    type: {
        type: String,
        required: [true, "Type should not be empty"]        
    },
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

module.exports = mongoose.model("Promotion", promotionSchema);