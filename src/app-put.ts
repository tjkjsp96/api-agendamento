import { Router, Request, Response } from 'express';
import { object, string, InferType } from 'yup';
// import pool from "./config/dbConnect.js";
import prisma from './config/prismaClient.js';

const router = Router();

let agendaAlterSchema = object({
  scope: string(),
  time: string(),
  date: string(),
  duration: string(),
  location: string(),
});

router.put('/agendas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: any = {};

    if (req.body.scope) data.scope = req.body.scope;
    if (req.body.time) data.scope = req.body.time;
    if (req.body.date) data.scope = req.body.date;
    if (req.body.duration) data.scope = req.body.duration;
    if (req.body.location) data.scope = req.body.location;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
    }

    const update = await prisma.agenda.update({
      where: { id: Number(id) },
      data,
    });

    res.status(201).json(update);
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(400).json({ error: 'Agenda não encontrada.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar agenda.' });
  }
});

export default router;
