import { db } from "../config/db.js";

export const getCategories = async (req, res) => {
  const sql = "SELECT * FROM  categories";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      data: results,
      status: "success",
      message: "Categories fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: results?.length,
      },
    });
  });
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "categories Name required" });
  }

  const sql = "INSERT INTO categories(name) VALUES (?)";
  db.query(sql, [name], (err, results) => {
    try {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err?.sqlMessage });
      }
      res.status(201).json({
        message: "category added",
        userId: results.insertId,
        status: "success",
      });
    } catch (error) {
      res.send(error.message);
    }
  });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  //  Validate ID is a valid number
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid  category ID. It must be a number." });
  }

  const sql = "UPDATE categories SET name = ?  WHERE id = ?";
  db.query(sql, [name, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err?.sqlMessage });
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "category not found" });
    }
    res.json({ message: "category updated!" });
  });
};

export const deleteCategory = async (req, res) => {
  // Delete logic
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must br number" });
  }
  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: " category not founnd" });
    }
    res.json({
      message: "category deleted!",
      status: "success",
    });
  });
};
