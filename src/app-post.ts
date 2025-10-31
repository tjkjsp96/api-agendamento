import { Router, Request, Response } from 'express';
import { object, string, InferType } from 'yup';
// import pool from "./config/dbConnect.js";
import prisma from './config/prismaClient.js';
import { AgendaData } from './types/AgendaData.js';

const router = Router();

let agendaCreateSchema = object({
  scope: string().required('O campo scope é obrigatório.'),
  time: string().required('O campo time é obrigatório.'),
  date: string().required('O campo date é obrigatório.'),
  duration: string().required('O campo duration é obrigatório.'),
  location: string().required('O campo location é obrigatório.'),
});

router.post('/agendas', async (req: Request, res: Response) => {
  try {
    const validatedData = await agendaCreateSchema.validate(req.body, { abortEarly: false });

    const created = await prisma.agenda.create({
      data: {
        scope: validatedData.scope,
        time: validatedData.time,
        date: validatedData.date,
        duration: validatedData.duration,
        location: validatedData.location,
      },
    });

    res.status(201).json(created);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro ao inserir agenda.' });
  }
});

export default router;
