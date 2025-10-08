import { Router } from "express";
import { object, string } from "yup";
// import pool from "./config/dbConnect.js";
import prisma from "./config/prismaClient.js";
const router = Router();
let agendaAlterSchema = object({
    scope: string(),
    time: string(),
    date: string(),
    duration: string(),
    location: string()
});
router.put("/agendas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = {};
        if (req.body.scope)
            data.scope = req.body.scope;
        if (req.body.time)
            data.time = req.body.time;
        if (req.body.date)
            data.date = req.body.date;
        if (req.body.duration)
            data.duration = req.body.duration;
        if (req.body.location)
            data.location = req.body.location;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: "Nenhum campo para atualizar." });
        }
        const update = await prisma.agendas.update({
            where: { id: Number(id) },
            data
        });
        res.status(201).json(update);
    }
    catch (err) {
        if (err.code === 'P2025') {
            return res.status(400).json({ error: "Agenda não encontrada." });
        }
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar agenda." });
    }
});
export default router;
