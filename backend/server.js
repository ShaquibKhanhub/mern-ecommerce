// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

//GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}); // {} means fetch the all products that we've in the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

//ADD PRODUCT
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Created product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

//UPDATE PRODUCT
//put for all the fields and patch for some fields
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body; //all details

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

//DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server is running on port 5000 http://localhost:5000 ");
});
