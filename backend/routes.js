import express from "express";
import { addApplication, getApplications } from "./store.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { company, role, url } = req.body;

  if (!company || !role) {
    return res.status(400).json({
      error: "company and role are required",
    });
  }

  const application = addApplication({
    company,
    role,
    url: url || "",
    status: "applied",
    appliedAt: new Date().toISOString().split("T")[0],
    confirmationReceived: false,
    notes: [],
  });

  res.status(201).json(application);
});

router.get("/", (req, res) => {
  res.json(getApplications());
});

export default router;
