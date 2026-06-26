// src/models/imc.model.js
import { prisma } from "../lib/prisma.js";

export async function listarRegistros(userId) {
  return prisma.imcRecord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function buscarRegistroPorId(id, userId) {
  return prisma.imcRecord.findFirst({
    where: { id, userId },
  });
}

export async function criarRegistro(data) {
  return prisma.imcRecord.create({ data });
}

export async function atualizarRegistro(id, data) {
  return prisma.imcRecord.update({ where: { id }, data });
}

export async function deletarRegistro(id) {
  return prisma.imcRecord.delete({ where: { id } });
}