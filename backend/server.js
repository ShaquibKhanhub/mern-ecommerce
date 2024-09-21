import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Required for using absolute path for serving files

app.use(express.json()); // allows us to accept JSON data in the req.body

// API Routes
app.use("/api/products", productRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server started at http://localhost:${PORT}`);
});
