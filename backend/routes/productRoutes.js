import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProduct,
  getProductsByCategoryId,
  getTodayDeals
} from "../controllers/productController.js";
import { upload } from "../config/multer.js";

const products = express.Router();

products.get("/api/products", getProducts);
products.get("/api/products/today_deals", getTodayDeals);
products.get("/api/products/:id", getProduct);
products.get("/api/products/category/:categoryId", getProductsByCategoryId);
products.post("/api/products", upload.array("productImages"), addProduct);
products.put("/api/products/:id", upload.array("productImages"), updateProduct);
products.delete("/api/products/:id", deleteProduct);

export default products;
