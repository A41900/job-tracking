import express from "express";
import { extractJobApplication } from "../services/jobExtractionService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (process.env.ENABLE_EXTRACTION === "false")
    return res.status(403).json({ error: "Extraction disabled" });
  const { jobText } = req.body;

  if (!jobText) {
    return res.status(400).json({ error: "jobText missing" });
  }

  try {
    const application = await extractJobApplication(jobText);
    res.json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "extraction failed" });
  }
});

export default router;
