import { Request, Response } from 'express';
import prisma from '../config/prismaClient.js';

export const deleteAgendaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.agendas.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: 'Agenda deletada com sucesso.' });
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Agenda não encontrada.' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar agenda.' });
  }
};
