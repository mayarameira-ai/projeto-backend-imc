// src/controllers/imc.controller.js
import * as ImcModel from "../models/imc.model.js";

function calcularIMC(weight, height) {
  return weight / (height * height);
}

function calcularCategoria(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25.0) return "Normal";
  if (imc < 30.0) return "Sobrepeso";
  if (imc < 35.0) return "Obesidade Grau I";
  if (imc < 40.0) return "Obesidade Grau II";
  return "Obesidade Grau III";
}

// GET /api/imc
export async function listar(req, res) {
  try {
    const registros = await ImcModel.listarRegistros(req.user.id);
    return res.json(registros);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar registros." });
  }
}

// GET /api/imc/:id
export async function buscar(req, res) {
  try {
    const registro = await ImcModel.buscarRegistroPorId(req.params.id, req.user.id);
    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }
    return res.json(registro);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar registro." });
  }
}

// POST /api/imc
export async function criar(req, res) {
  try {
    const { weight, height } = req.body;

    if (weight == null || height == null) {
      return res.status(400).json({ error: "Peso e altura são obrigatórios." });
    }
    if (weight <= 0 || height <= 0) {
      return res.status(400).json({ error: "Peso e altura devem ser maiores que zero." });
    }

    const imc = calcularIMC(weight, height);
    const category = calcularCategoria(imc);

    const registro = await ImcModel.criarRegistro({
      weight,
      height,
      imc: parseFloat(imc.toFixed(2)),
      category,
      userId: req.user.id,
    });

    return res.status(201).json(registro);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
}

// PUT /api/imc/:id
export async function atualizar(req, res) {
  try {
    const { weight, height } = req.body;

    const registro = await ImcModel.buscarRegistroPorId(req.params.id, req.user.id);
    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    if (weight == null || height == null) {
      return res.status(400).json({ error: "Peso e altura são obrigatórios." });
    }
    if (weight <= 0 || height <= 0) {
      return res.status(400).json({ error: "Peso e altura devem ser maiores que zero." });
    }

    const imc = calcularIMC(weight, height);
    const category = calcularCategoria(imc);

    const atualizado = await ImcModel.atualizarRegistro(req.params.id, {
      weight,
      height,
      imc: parseFloat(imc.toFixed(2)),
      category,
    });

    return res.json(atualizado);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar registro." });
  }
}

// DELETE /api/imc/:id
export async function deletar(req, res) {
  try {
    const registro = await ImcModel.buscarRegistroPorId(req.params.id, req.user.id);
    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado." });
    }

    await ImcModel.deletarRegistro(req.params.id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar registro." });
  }
}