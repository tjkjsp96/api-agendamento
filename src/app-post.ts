
import { Router, Request, Response } from "express";
import pool from "./config/dbConnect.js";
import { AgendaData } from "./types/AgendaData.js";
import { object, string, InferType } from "yup";

const router = Router();

let agendaCreateSchema = object({
    scope: string().required("O campo scope é obrigatório."),
    time: string().required("O campo time é obrigatório."),
    date: string().required("O campo date é obrigatório."),
    duration: string().required("O campo duration é obrigatório."),
    location: string().required("O campo location é obrigatório.")
});

router.post("/agendas", async (req:Request, res:Response) => {
    try {
        const validatedData = await agendaCreateSchema.validate(req.body, { abortEarly: false });

        // const data: AgendaData = req.body;

        const result = await pool.query(
            'INSERT INTO agendas (scope,time,date,duration,location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                 validatedData.scope
                ,validatedData.time
                ,validatedData.date
                ,validatedData.duration
                ,validatedData.location
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: any) {
        if (err.name === "ValidationError"){
            return res.status(400).json({errors: err.errors});
        }
        console.error(err);
        res.status(500).json({error: "Erro ao inserir agenda."});
    }
});

export default router;