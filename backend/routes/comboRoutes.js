import express from "express";
import {
  addCombo,
  removeProductFromCombo,
  updateCombo,
} from "../controllers/comboController.js";

const combos = express.Router();

combos.post("/api/combos", addCombo);
combos.put("/api/combos/:id", updateCombo);
combos.delete("/api/combos/:comboId/products/:productId", removeProductFromCombo);

export default combos;
