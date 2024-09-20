import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//GET ALL PRODUCTS
router.get("/", getProducts);

//ADD PRODUCT
router.post("/", createProduct);

//UPDATE PRODUCT
//put for all the fields and patch for some fields
router.put("/:id", updateProduct);

//DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
