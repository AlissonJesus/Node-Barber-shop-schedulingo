import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app = express();
app.use(cors())

app.use(express.json());
app.use(routes);

export default app


