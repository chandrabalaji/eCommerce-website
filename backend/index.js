import express from "express";
import { connectMysqlDb, db } from "./config/db.js";
import categories from "./routes/categoryRoutes.js";
import products from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 9000;
await connectMysqlDb();

app.use(cors());
app.use(express.json());
app.use(categories);
app.use(products);

app.get("/uploads/:image", (req, res) => {
  const fileName = req.params.image;
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename);
 
  const filePath = path.join(__dirname, "uploads/", fileName);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("Image not found");
    }
  });
});

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
