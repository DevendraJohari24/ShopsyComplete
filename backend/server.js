import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import countdownRoutes from "./routes/countdownRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"


const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/countdowns", countdownRoutes);
app.use("/api/v1/features", featureRoutes);
app.use("/api/v1/feedbacks", feedbackRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/promotions", promotionRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/sliders", sliderRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/users", userRoutes);



if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
