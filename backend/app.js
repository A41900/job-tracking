import express from "express";
import cors from "cors";
import applicationsRoutes from "./routes/applications.js";
import extractionRoutes from "./routes/extraction.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/applications", applicationsRoutes);
app.use("/extraction", extractionRoutes);

export default app;
