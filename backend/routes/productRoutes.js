import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProduct,
} from "../controllers/productController.js";
import { upload } from "../config/multer.js";

const products = express.Router();

products.get("/api/products", getProducts);
products.post("/api/products", upload.array("productImages"), addProduct);
products.put("/api/products/:id", updateProduct);
products.get("/api/products/:id", getProduct);
products.delete("/api/products/:id", deleteProduct);

export default products;
