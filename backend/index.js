import express from "express";
import { connectMysqlDb, db } from "./config/db.js";
import categories from "./routes/categoryRoutes.js";
import products from "./routes/productRoutes.js";
import cors from 'cors';

const app = express();
const PORT = 9000;
connectMysqlDb();

app.use(cors());
app.use(express.json());
app.use(categories);
app.use(products);

// -------------------- $------------------------------
// catch-all invalid Route
app.use((req, res, next) => {
  res.status(404).json({ error: "URL invalid" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("internal server error");
});
app.listen(PORT, () => {
  console.log("http://localhost:9000");
});
