// src/routes/imc.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listar, buscar, criar, atualizar, deletar } from "../controllers/imc.controller.js";

const router = Router();

// Todas as rotas de IMC exigem login
router.use(requireAuth);

router.get("/", listar);       // GET    /api/imc
router.get("/:id", buscar);    // GET    /api/imc/:id
router.post("/", criar);       // POST   /api/imc
router.put("/:id", atualizar); // PUT    /api/imc/:id
router.delete("/:id", deletar);// DELETE /api/imc/:id

export default router;