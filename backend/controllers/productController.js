import { db } from "../config/db.js";
import { validateRequiredFields } from "../utils/validateFields.js";
const requiredFields = ["name", "price", "category_id"];

export const getProducts = async (req, res) => {
  const sql = "SELECT * FROM productlist";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      data: results,
      status: "success",
      message: "products fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: results?.length,
      },
    });
  });
};

export const addProduct = async (req, res) => {
  // Add logic
  //name price category_id
  const { name, price, category_id } = req.body;
  const productImages = req.files;

  const validation = validateRequiredFields(req.body, requiredFields);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Some fields are missing",
      missingFields: validation?.missingFields,
      status: 400,
    });
  }

  const sql = "INSERT INTO products(name,price,category_id) VALUES (?,?,?)";

  try {
    db.execute(sql, [name, price, category_id], async (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: err?.sqlMessage || "Database error" });
      }

      const productId = results.insertId;
      console.log(productId);

      const insertImages = productImages.map((file, index) => {
        const filePath = file.path;
        const isPrimary = index == 0 ? true : false;
        const sql =
          "INSERT INTO product_images(product_id,image_url,is_primary) VALUES(? , ?, ?) ";
        return db.query(sql, [productId, filePath, isPrimary]);
        
      });
      console.log(insertImages);

      await Promise.all(insertImages);
      res.json({
        message: "product added",
        insertId: results.insertId,
        status: "success",
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const updateProduct = async (req, res) => {
  // Update logic
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  //  Validate ID is a valid number
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid  category ID. It must be a number." });
  }

  const validation = validateRequiredFields(req.body, requiredFields);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Some fields are missing",
      missingFields,
      status: 400,
    });
  }

  const sql =
    "UPDATE productlist SET name = ? , price = ? , category_id = ?  WHERE id = ?";

  try {
    db.query(sql, [name, price, category_id, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "product not found",
        });
      }
      res.json({ message: "product updated!", status: "success" });
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const deleteProduct = async (req, res) => {
  // Delete logic
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must br number" });
  }
  const sql = "DELETE FROM productlist WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: " product not founnd" });
    }
    res.json({
      message: "product deleted!",
      status: "success",
    });
  });
};
