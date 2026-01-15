import express from "express";
import { getAll, update, remove } from "./store.js";
import { createApplication } from "./service.js";
import { ZodError } from "zod";

const routes = express.Router();

routes.post("/", createApplicationHandler);
routes.get("/", getApplicationsHandler);
routes.get("/:id", getApplicationsHandler);
routes.put("/", updateApplicationHandler);
routes.delete("/", deleteApplicationHandler);

export default routes;

// POST /applications
export function createApplicationHandler(req, res) {
  try {
    const app = createApplication(req.body);
    res.status(201).json(app);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid data",
        details: err.errors,
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
// GET /applications
function getApplicationsHandler(req, res) {
  res.json(getAll());
}

// PUT /applications/:id
function updateApplicationHandler(req, res) {
  const updated = updateApplication(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Application not found" });
  }

  res.json(updated);
}

// DELETE /applications/:id
function deleteApplicationHandler(req, res) {
  const ok = delete req.params.id;

  if (!ok) {
    return res.status(404).json({ error: "Application not found" });
  }

  res.status(204).send();
}
