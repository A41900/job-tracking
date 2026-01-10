// index.js
import express from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationsRouter);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
