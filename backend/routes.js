// routes/applications.js
import express from "express";
import { getAll } from "./store.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getAll());
});

export default router;
