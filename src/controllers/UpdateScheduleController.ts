import { Request, Response } from 'express';
import { object, string } from 'yup';
import prisma from '../config/prismaClient.js';

const agendaUpdateSchema = object({
  scope: string().notRequired(),
  time: string().notRequired(),
  date: string().notRequired(),
  duration: string().notRequired(),
  location: string().notRequired(),
});

export const updateAgendaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validated = await agendaUpdateSchema.validate(req.body, { abortEarly: false });

    const data: any = {};
    if (validated.scope !== undefined) data.scope = validated.scope;
    if (validated.time !== undefined) data.time = validated.time;
    if (validated.date !== undefined) data.date = validated.date;
    if (validated.duration !== undefined) data.duration = validated.duration;
    if (validated.location !== undefined) data.location = validated.location;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
    }

    const update = await prisma.agendas.update({ where: { id: Number(id) }, data });

    return res.status(200).json(update);
  } catch (err: any) {
    if (err.code === 'P2025') { //ajustar para buscar o valor e caso não encontrado o próprio código retornar o erro.
      return res.status(404).json({ error: 'Agenda não encontrada.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(422).json({ errors: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar agenda.' });
  }
};
