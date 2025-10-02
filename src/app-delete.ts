
import { Router, Request, Response } from "express";
import pool from "./config/dbConnect.js";

const router = Router();

router.delete("/agendas/:id", async (req:Request, res:Response) =>{
    try{
        const {id} = req.params;

        const result = await pool.query('DELETE FROM agendas WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Agenda não encontrada."});
        }

        res.status(200).json({ message: "Agenda deletada com sucesso." });
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agenda."})
        }
});

export default router;
