import express from "express";
import cors from "cors";
import applicationRouters from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/applications", applicationRouters);

export default app;
