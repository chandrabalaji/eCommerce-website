import { db } from "../config/db.js";

export const getCategories = async (req, res) => {
  const sql = `
  WITH Rankedimages  AS (
    SELECT 
      c.name, 
      c.id,
      pi.image_url,
      ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY pi.id DESC) AS rn
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    LEFT JOIN product_images pi ON p.id = pi.product_id
  ),
  ProductCounts AS (
    SELECT 
      c.id AS category_id,
      COUNT(p.id) AS product_count
    FROM categories c 
    LEFT JOIN products p ON c.id = p.category_id
    GROUP BY c.id
  )
  SELECT 
    r.id, 
    r.name,
    r.image_url,
    COALESCE(pc.product_count,0) AS product_count
  FROM Rankedimages r
  LEFT JOIN ProductCounts pc ON r.id = pc.category_id
  WHERE r.rn = 1 OR r.rn IS NULL
  `;

  try {
    const [results] = await db.query(sql);
    res.status(200).json({
      data: results,
      status: "success",
      message: "Categories fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: results?.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "categories Name required" });
  }

  const sql = "INSERT INTO categories(name) VALUES (?)";
  try {
    const [categoryResult] = await db.query(sql, [name]);
    res.status(201).json({
      message: "category added",
      userId: categoryResult.insertId,
      status: "success",
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: err?.sqlMessage });
  }
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
  try {
    const [results] = await db.execute(sql, [name, id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "category not found" });
    }

    res.json({ message: "category updated!", status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.sqlMessage || "Database error" });
  }
};

export const deleteCategory = async (req, res) => {
  // Delete logic
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must br number" });
  }
  const sql = "DELETE FROM categories WHERE id = ?";
  try {
    const [results] = await db.execute(sql, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "category not found" });
    }

    res.json({
      message: "category deleted!",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Database error" });
  }
};
