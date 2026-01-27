// routes/applications.js
import express from "express";
import { update, getActiveApplications } from "../store.js";
import { createApplication } from "../services/applicationService.js";
import { ZodError } from "zod";

const router = express.Router();

// POST /applications
router.post("/", createApplicationHandler);

// GET /applications
router.get("/", getApplicationsHandler);
router.get("/:id", getApplicationsHandler);

// PUT /applications/:id
router.put("/:id", updateApplicationHandler);

export default router;

// ---------------- HANDLERS ----------------
function createApplicationHandler(req, res) {
  try {
    const app = createApplication(req.body);
    res.status(201).json(app);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("❌ ZOD ERROR DETAILS:");
      console.error(JSON.stringify(err.errors, null, 2));

      return res.status(400).json({
        error: "Invalid data",
        details: err.errors,
      });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

function getApplicationsHandler(req, res) {
  res.json(getActiveApplications());
}

function updateApplicationHandler(req, res) {
  const updated = update(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Application not found" });
  }

  res.json(updated);
}
