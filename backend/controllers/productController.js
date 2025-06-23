import path from "path";
import fs from "fs";
import { db } from "../config/db.js";
import { validateRequiredFields } from "../utils/validateFields.js";
import { __dirname } from "../constant.js";

const requiredFields = ["name", "price", "category_id"];

export const getProducts = async (req, res) => {
  const { offset, limit } = req.query;

  const params = [];

  let sql = `SELECT
    p.name,
    p.id,
    p.price,
    p.category_id,
     JSON_ARRAYAGG(
     JSON_OBJECT(
        'id',IMG.id,
        'url', IMG.image_url,
        'name', IMG.image_name
      )
    ) AS image_urls,
    CAT.name AS category_name
  FROM 
    products p
  JOIN
    product_images IMG ON p.id = IMG.product_id
  JOIN
    categories CAT ON p.category_id = CAT.id
  GROUP BY 
    p.id
    `;

  const countQuery = `SELECT COUNT(*) AS totalCount FROM products`;
  if (limit != 0) {
    sql += "LIMIT ? OFFSET ? ";
    params.push(limit, offset);
  }

  try {
    const [results] = await db.execute(sql, params);
    const [[{ totalCount }]] = await db.execute(countQuery);

    res.status(200).json({
      data: results,
      status: "success",
      message: "products fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: totalCount,
        offset,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err?.message });
  }
};
// product by id
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT
    p.name,
    p.id,
    p.price,
    p.is_today_deal,
    p.category_id,
     JSON_ARRAYAGG(
      JSON_OBJECT(
        'id',IMG.id,
        'url', IMG.image_url,
        'name', IMG.image_name
      )
    ) AS image_urls,
    CAT.name AS category_name
  FROM 
    products p
  JOIN
    product_images IMG ON p.id = IMG.product_id
  JOIN
    categories CAT ON p.category_id = CAT.id
  WHERE 
      p.id = ?
  GROUP BY 
    p.id 
    `;
  if (isNaN(id)) {
   return res.status(400).json({
      error: "Invalid  product ID. It must be a number.",
    });
  }
  try {
    const [results] = await db.execute(sql, [id]);

    res.status(200).json({
      data: results,
      status: "success",
      message: "products fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: results?.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err?.message });
  }
};

export const getTodayDeals = async (req, res) => {
  let sql = `SELECT
    p.name,
    p.id,
    p.price,
    p.category_id,
     JSON_ARRAYAGG(
     JSON_OBJECT(
        'id',IMG.id,
        'url', IMG.image_url,
        'name', IMG.image_name
      )
    ) AS image_urls,
    CAT.name AS category_name
  FROM 
    products p
  JOIN
    product_images IMG ON p.id = IMG.product_id
  JOIN
    categories CAT ON p.category_id = CAT.id
  WHERE
     p.is_today_deal = 1
  GROUP BY 
     p.id
    `;

  const [results] = await db.query(sql);
  res.json({
    data: results,
    status: "success",
    message: " todayDeals products fetched successfully",
    timestamp: Date.now(),
  });
};
export const getProductsByCategoryId = async (req, res) => {
  const { categoryId: id } = req.params;
  const sql = `SELECT
    p.name,
    p.id,
    p.price,
     JSON_ARRAYAGG(
      JSON_OBJECT(
        'id',IMG.id,
        'url', IMG.image_url,
        'name', IMG.image_name
      )
    ) AS image_urls,
    CAT.name AS category_name
  FROM 
    products p
  JOIN
    product_images IMG ON p.id = IMG.product_id
  JOIN
    categories CAT ON p.category_id = CAT.id
  WHERE 
      p.category_id = ?
  GROUP BY 
    p.id 
    `;

  try {
    const [results] = await db.execute(sql, [id]);

    res.status(200).json({
      data: results,
      status: "success",
      message: "products fetched successfully",
      timestamp: Date.now(),
      meta: {
        totalCount: results?.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err?.message });
  }
};

export const addProduct = async (req, res) => {
  // Add logic
  //name price category_id
  const { name, price, category_id } = req.body;
  const todayDealValue = JSON.parse(req.body.is_today_deal);
  const productImages = req.files;

  const validation = validateRequiredFields(req.body, requiredFields);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Some fields are missing",
      missingFields: validation?.missingFields,
      status: 400,
    });
  }

  const sql =
    "INSERT INTO products(name,price,category_id,todayDealValue) VALUES (?,?,?,?)";

  try {
    const [productResult] = await db.query(sql, [
      name,
      price,
      category_id,
      todayDealValue,
    ]);

    const productId = productResult.insertId;

    const insertImages = productImages.map((file, index) => {
      const filePath = file.path;
      const fileName = file.name;

      const sql =
        "INSERT INTO product_images(product_id,image_url,image_name) VALUES(? , ?, ?) ";
      return db.query(sql, [productId, filePath, fileName]);
    });
    await Promise.all(insertImages);
    res.status(201).json({
      message: "product added",
      insertId: productResult.insertId,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const updateProduct = async (req, res) => {
  // Update logic
  const { id } = req.params;
  const { name, price, category_id } = req.body;
  const todayDealValue = JSON.parse(req.body.is_today_deal);
  const product_images = req.files;
  const deleteImageIds = JSON.parse(req.body.delete_images_ids || "[]");

  //  Validate ID is a valid number
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid  product ID. It must be a number." });
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
    "UPDATE products SET name = ? , price = ? , category_id = ? , is_today_deal = ? WHERE id = ?";

  try {
    const [updateProductResult] = await db.query(sql, [
      name,
      price,
      category_id,
      todayDealValue,
      id,
    ]);

    if (updateProductResult.affectedRows === 0) {
      res.status(404).json({
        message: "product not found",
      });
    }

    // images delete functions
    if (deleteImageIds.length) {
      const [images] = await db.query(
        "SELECT id, image_url FROM product_images WHERE id IN (?)",
        [deleteImageIds]
      );
      images.forEach((imageObj) => {
        const filePath = path.join(__dirname, imageObj.image_url);
        fs.unlink(filePath, (err) => {
          if (err) console.error(err, "delete  product images");
        });
      });

      await db.query("DELETE FROM product_images WHERE id IN (?)", [
        deleteImageIds,
      ]);
    }

    if (product_images) {
      const updateProductImages = product_images.map((file) => {
        const filePath = file.path;
        const fileName = file.originalname;

        const sql =
          "INSERT INTO product_images(product_id,image_url,image_name) VALUES(? , ?, ?)";

        return db.query(sql, [id, filePath, fileName]);
      });
      await Promise.all(updateProductImages);
    }
    res.json({
      message: "product updated!",
      status: "success",
      updatedId: id,
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
  try {
    const [results] = await db.query(sql, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: " product not founnd" });
    }
    res.json({
      message: "product deleted!",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};
