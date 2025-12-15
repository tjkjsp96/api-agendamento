import { Request, Response } from 'express';
import prisma from '../config/prismaClient.js';

export const getAllAgendasController = async (req: Request, res: Response) => {
  try {
    const pageParam = Number(req.query.page ?? 1);
    const perPageParam = Number(req.query.perPage ?? 10);

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
    const perPage = Number.isInteger(perPageParam) && perPageParam > 0 ? Math.min(perPageParam, 100) : 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [items, total] = await prisma.$transaction([
      prisma.agendas.findMany({
        skip,
        take,
      }),
      prisma.agendas.count(),
    ]);

     const totalPages = Math.ceil(total / perPage);

    const meta = {
      total,
      page,
      perPage,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    return res.status(200).json({ data: items, meta });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar agendas.' });
  }

};
