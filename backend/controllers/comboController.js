import { db } from "../config/db.js";

export const addCombo = async (req, res) => {
  const { combo_name, combo_price, product_ids } = req.body;
  const productIds = product_ids;
  if (!combo_name) {
    return res.status(400).json({ error: "combo Name required" });
  }

  const comboSql = "INSERT INTO combos(combo_name,combo_price) VALUES (?,?)";

  try {
    let combo_insert_id;

    const [Result] = await db.query(comboSql, [combo_name, combo_price]);
    combo_insert_id = Result.insertId;
    const insertomboItems = productIds.map((productID) => [
      combo_insert_id,
      productID,
    ]);

    // 	Old Way (1 query per row)
    /* const insertomboItems = productIds.map((productID) => {
      return db.query(sql, [combo_insert_id, productID]);
    });
    await Promise.all(insertomboItems); */

    //	New Way (bulk insert)
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
  const { combo_name, combo_price, product_ids: productIds } = req.body;

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
