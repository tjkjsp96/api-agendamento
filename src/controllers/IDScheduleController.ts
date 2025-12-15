import { Request, Response } from 'express';
import prisma from '../config/prismaClient.js';

export const getAgendaByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agenda = await prisma.agendas.findUnique({ where: { id: Number(id) } });

    if (!agenda) return res.status(404).json({ error: 'Agenda não encontrada.' });

    return res.status(200).json(agenda);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar agenda.' });
  }
};
