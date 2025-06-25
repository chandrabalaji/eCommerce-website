import { db } from "../config/db.js";
import path from "path";
import fs from "fs";
import { __dirname } from "../constant.js";

export const getCombosList = async (req, res) => {
  const sql = `SELECT 
       C.combo_id, 
       C.combo_name, 
       C.combo_price,
       C.combo_image_url,
    JSON_ARRAYAGG(
       CI.product_id
       ) AS product_ids
    FROM 
       combos C 
    JOIN 
      combo_items CI ON CI.combo_id = c.combo_id 
    JOIN 
      products P ON P.id = CI.product_id 
    GROUP BY 
      C.combo_id, C.combo_name, C.combo_price
    `;

  try {
    const [results] = await db.execute(sql);

    // Step 1: Extract unique product IDs
    const allProductIds = [
      ...new Set(results.flatMap((combo) => combo.product_ids)),
    ];

    // Step 2: Fetch product details for all product IDs
    const productSql = `SELECT
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
      p.id IN (${allProductIds.join(",")})
  GROUP BY 
    p.id 
    `;

    const [productDetails] = await db.execute(productSql);

    // Step 3: Map products by ID for easy lookup
    const productMap = {};
    productDetails.forEach((p) => {
      productMap[p.id] = p;
    });

    // Step 4: Attach full product data to combos
    const comboWithProductDetails = results.map((combo) => {
      const productIds = combo.product_ids;
      const fullDetails = productIds.map((id) => productMap[id]);
      delete combo.product_ids;
      return {
        ...combo,
        product_details: fullDetails,
      };
    });
    res.status(200).json({
      data: comboWithProductDetails,
      status: "success",
      message: "combo products fetched successfully",
      timestamp: Date.now(),
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err?.message });
  }
};

export const getCombo = async (req, res) => {
  const comboId = req.params.id;
  const sql = `SELECT 
    C.combo_id, 
    C.combo_name, 
    C.combo_price,
    C.combo_image_url,
  JSON_ARRAYAGG(
    CI.product_id
  ) AS product_ids
  FROM 
    combos C 
  JOIN 
    combo_items CI ON CI.combo_id = C.combo_id 
  JOIN 
    products P ON P.id = CI.product_id 
  WHERE 
    C.combo_id = ?
  GROUP BY 
    C.combo_id, C.combo_name, C.combo_price;
    `;

  try {
    const [results] = await db.execute(sql, [comboId]);

    // Step 1: Extract unique product IDs
    const allProductIds = results[0].product_ids;

    // Step 2: Fetch product details for all product IDs
    const productSql = `SELECT
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
      p.id IN (${allProductIds.join(",")})
  GROUP BY 
    p.id 
    `;

    const [productDetails] = await db.execute(productSql);

    // Step 3: Map products by ID for easy lookup
    const productMap = {};
    productDetails.forEach((p) => {
      productMap[p.id] = p;
    });

    // Step 4: Attach full product data to combos
    const comboWithProductDetails = results.map((combo) => {
      const productIds = combo.product_ids;
      const fullDetails = productIds.map((id) => productMap[id]);
      delete combo.product_ids;
      return {
        ...combo,
        product_details: fullDetails,
      };
    });
    res.status(200).json({
      data: comboWithProductDetails,
      status: "success",
      message: "combo products fetched successfully",
      timestamp: Date.now(),
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err?.message });
  }
};

export const addCombo = async (req, res) => {
  const { combo_name, combo_price, product_ids } = req.body;
  const comboImageUrl = req.files[0]?.path;

  const productIds = JSON.parse(product_ids);
  if (!combo_name) {
    return res.status(400).json({ error: "combo Name required" });
  }

  const comboSql =
    "INSERT INTO combos(combo_name,combo_price,combo_image_url) VALUES (?,?,?)";

  try {
    let combo_insert_id;

    const [Result] = await db.query(comboSql, [
      combo_name,
      combo_price,
      comboImageUrl,
    ]);
    combo_insert_id = Result.insertId;

    // 	Old Way (1 query per row)
    /* const insertomboItems = productIds.map((productID) => {
      return db.query(sql, [combo_insert_id, productID]);
    });
    await Promise.all(insertomboItems); */

    //	New Way (bulk insert)
    const insertomboItems = productIds.map((productID) => [
      combo_insert_id,
      productID,
    ]);
    const sql = "INSERT INTO combo_items (combo_id , product_id) VALUES ? ";
    await db.query(sql, [insertomboItems]);

    res.status(201).json({
      message: "Combo  added",
      userId: combo_insert_id,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: err?.sqlMessage });
  }
};

export const updateCombo = async (req, res) => {
  const comboId = req.params.id;
  const { combo_name, combo_price, product_ids } = req.body;
  const productIds = JSON.parse(product_ids);

  if (!combo_name || !combo_price || !Array.isArray(productIds)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const comboSql =
    "UPDATE  combos SET combo_name = ?, combo_price = ?  WHERE combo_id = ? ";

  try {
    await db.query(comboSql, [combo_name, combo_price, comboId]);

    // remove old combos
    await db.query("DELETE FROM combo_items WHERE combo_id = ?", [comboId]);

    // insert new combo
    const insertomboItems = productIds.map((productID) => [comboId, productID]);

    await db.query("INSERT INTO combo_items (combo_id , product_id) VALUES ?", [
      insertomboItems,
    ]);
    res.status(200).json({
      message: "Combo updated successfully ",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: err?.sqlMessage });
  }
};

export const deleteCombo = async (req, res) => {
  const { id } = req.params;
  const [comboData] = await db.execute(
    "SELECT * FROM combos WHERE combo_id = ?",
    [id]
  );

  if (comboData?.length === 0) {
    return res.status(404).json({
      message: "record not found",
    });
  }

  const comboSql = "DELETE FROM combos WHERE combo_id = ?";
  await db.execute(comboSql, [id]);

  const comboItemsSql = "DELETE FROM combo_items WHERE combo_id = ?";
  await db.execute(comboItemsSql, [id]);

  if (comboData[0].combo_image_url) {
    const filePath = path.join(__dirname, comboData[0].combo_image_url);
    fs.unlink(filePath, (err) => {
      if (err) console.error(err, "delete  product images");
    });
  }

  res.json({
    message: "combo successfully deleted!",
  });
};

export const removeProductFromCombo = async (req, res) => {
  const { comboId, productId } = req.params;

  try {
    const sql = "DELETE FROM combo_items WHERE combo_id = ? AND product_id = ?";
    const [Result] = await db.query(sql, [comboId, productId]);

    if (Result.affectedRows === 0) {
      return res.status(404).json({ message: "item not found" });
    }
    res.json({ message: "product remove from combo" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove product", error: err.message });
  }
};
