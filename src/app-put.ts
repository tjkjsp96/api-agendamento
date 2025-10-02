
import { Router, Request, Response } from "express";
import pool from "./config/dbConnect.js";
// import { object, string, InferType } from "yup";

const router = Router();

// let agendaAlterSchema = object({
//     scope: string(),
//     time: string(),
//     date: string(),
//     duration: string(),
//     location: string()
// });

router.put("/agendas/:id", async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;
        const campos = [];
        const valores = [];
        let i = 1;

        if (req.body.scope) {
            campos.push(`scope = $${i++}`);
            valores.push(req.body.scope);
        }
        if (req.body.time) {
            campos.push(`time = $${i++}`);
            valores.push(req.body.time);
        }
        if (req.body.date) {
            campos.push(`date = $${i++}`);
            valores.push(req.body.date);
        }
        if (req.body.duration) {
            campos.push(`duration = $${i++}`);
            valores.push(req.body.duration);
        }
        if (req.body.location) {
            campos.push(`location = $${i++}`);
            valores.push(req.body.location);
        }

        valores.push(id);

        const query = `UPDATE agendas SET ${campos.join(', ')} WHERE id = $${i} RETURNING *`;
        const result = await pool.query(query, valores);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Agenda não encontrada." });
        }

        res.status(201).json(result.rows[0]);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao atualizar agenda."});
    }
});

export default router;