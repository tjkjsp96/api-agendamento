
import { Router, Request, Response } from "express";
import pool from "./config/dbConnect.js";

const router = Router();

router.get("/agendas", async (_, res:Response) => {
    try{
        const result = await pool.query('SELECT * FROM agendas');

        res.status(200).json(result.rows);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agendas."})
        }
});

router.get("/agendas/:id", async (req:Request, res:Response) => {
    try{
        const {id} = req.params;

        const result = await pool.query('SELECT * FROM agendas WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Agenda não encontrada."});
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agenda."})
        }
});

export default router;