
import { Router, Request, Response } from "express";
import prisma from "./config/prismaClient.js"
// import pool from "./config/dbConnect.js";

const router = Router();

router.delete("/agendas/:id", async (req:Request, res:Response) =>{
    try{
        const {id} = req.params;

        const deleted = await prisma.agendas.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ message: "Agenda deletada com sucesso." });
    } catch (err: any) {
        if (err.code === 'P2025') {
            return res.status(404).json({error: "Agenda não encontrada."});
        }
        console.error(err);
        res.status(500).json({error: "Erro ao buscar agenda."})
        }
});

export default router;
