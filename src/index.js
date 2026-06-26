// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// CORS — deve vir antes das rotas
app.use(cors({
  origin: "http://localhost:3000", // Next.js na porta 3000
  credentials: true,
}));

app.use(express.json());

// Rotas de autenticação do Better Auth
app.all("/api/auth/*path", toNodeHandler(auth));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});