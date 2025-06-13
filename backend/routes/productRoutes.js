import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/api/products", getProducts);
router.post("/api/products", addProduct);
router.put("/api/products:id", updateProduct);
router.post("/api/products:id", deleteProduct);
