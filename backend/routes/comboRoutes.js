import express from "express";
import {
  addCombo,
  removeProductFromCombo,
  updateCombo,
  getCombosList,
  getCombo,
  deleteCombo,
} from "../controllers/comboController.js";
import { upload } from "../config/multer.js";

const combos = express.Router();

combos.get("/api/combos", getCombosList);
combos.get("/api/combos/:id", getCombo);
combos.post("/api/combos", upload.array("combo_image_url"), addCombo);
combos.put("/api/combos/:id", upload.array("combo_image_url"), updateCombo);
combos.delete("/api/combos/delete/:id", deleteCombo);
combos.delete(
  "/api/combos/:comboId/products/:productId",
  removeProductFromCombo
);

export default combos;
