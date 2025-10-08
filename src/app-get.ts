
import { Router, Request, Response } from "express";
// import pool from "./config/dbConnect.js";
import prisma from "./config/prismaClient.js"

const router = Router();

router.get("/agendas", async (_, res:Response) => {
    try{
    // const result = await pool.query('SELECT * FROM agendas');
    const result = await prisma.agendas.findMany();
        res.status(200).json(result);

    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agendas."})
        }
});

router.get("/agendas/:id", async (req:Request, res:Response) => {
    try{
        const {id} = req.params;

    // const result = await pool.query('SELECT * FROM agendas WHERE id = $1', [id]);
    const agenda = await prisma.agendas.findUnique({ where: { id: Number(id) } });

        if (!agenda) {
            return res.status(404).json({error: "Agenda não encontrada."});
        }

        res.status(200).json(agenda);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agenda."})
        }
});

export default router;