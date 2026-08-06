import dotenv from "dotenv";
import express from "express";
import {
  deleteSelectedItem,
  getAllItem,
  getSelectedItem,
  postItems,
  reorderItems,
  selectItem,
} from "./controllers/itemController.js";

import "./workers/mutationWorker.js";
import "./workers/addItemWorker.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "8080";

// body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/items", getAllItem);
app.post("/items", postItems);

app.post("/select", selectItem);
app.get("/select", getSelectedItem);
app.delete("/select/:id", deleteSelectedItem);

app.post("/reorder", reorderItems);

async function start() {
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
  });
}

start();
