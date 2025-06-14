import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const products = express.Router();

products.get("/api/products", getProducts);
products.post("/api/products", addProduct);
products.put("/api/products/:id", updateProduct);
products.delete("/api/products/:id", deleteProduct);

export default products;
