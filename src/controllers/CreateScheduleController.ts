import { Request, Response } from 'express';
import { object, string } from 'yup';
import prisma from '../config/prismaClient.js';

const agendaCreateSchema = object({
  scope: string().required('O campo scope é obrigatório.'),
  time: string().required('O campo time é obrigatório.'),
  date: string().required('O campo date é obrigatório.'),
  duration: string().required('O campo duration é obrigatório.'),
  location: string().required('O campo location é obrigatório.'),
});

export const createAgendaController = async (req: Request, res: Response) => {
  try {
    const validated = await agendaCreateSchema.validate(req.body, { abortEarly: false });

    const created = await prisma.agendas.create({
      data: {
        scope: validated.scope,
        time: validated.time,
        date: validated.date,
        duration: validated.duration,
        location: validated.location,
      },
    });

    return res.status(201).json(created);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ errors: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro ao inserir agenda.' });
  }
};
