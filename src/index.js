// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import imcRoutes from "./routes/imc.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Autenticação
app.all("/api/auth/*path", toNodeHandler(auth));

// Rotas
app.use("/api/imc", imcRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});