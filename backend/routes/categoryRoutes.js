import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const categories = express.Router();

categories.get("/api/Category", getCategories);
categories.post("/api/Category", addCategory);
categories.put("/api/Category:id", updateCategory);
categories.post("/api/Category:id", deleteCategory);

export default categories