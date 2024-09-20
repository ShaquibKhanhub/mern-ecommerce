// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port 5000 http://localhost:${PORT} `);
});
