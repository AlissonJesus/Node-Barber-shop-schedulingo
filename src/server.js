import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app = express();
app.use(cors())

app.use(express.json());
app.use(routes);
app.use((req, res) => {
    return res.status(500).json({message: "Erro interno do servidor"})
})
export default app


