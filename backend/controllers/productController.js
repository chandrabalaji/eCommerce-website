import { db } from "../config/db";
export const getProducts = async (req, res) => {
  const sql = "SELECT * FROM productlist";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ data: results });
  });
};

export const addProduct = async (req, res) => {
  // Add logic
};

export const updateProduct = async (req, res) => {
  // Update logic
};

export const deleteProduct = async (req, res) => {
  // Delete logic
};
