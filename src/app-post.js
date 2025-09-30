
import express from "express";
import pool from "./config/dbConnect.js";
import { object, string, InferType } from "yup";

const app = express();
app.use(express.json()); //middleware - Acesso as req e res e fazer algumas ações

let agendaCreateSchema = object({
    scope: string().required("O campo scope é obrigatório."),
    time: string().required("O campo time é obrigatório."),
    date: string().required("O campo date é obrigatório."),
    duration: string().required("O campo duration é obrigatório."),
    location: string().required("O campo location é obrigatório.")
});

app.post("/agendas", async (req, res) => {
    try {
        const validatedData = await agendaCreateSchema.validate(req.body, { abortEarly: false });

        const{scope,time,date,duration,location} = req.body;

        const result = await pool.query(
            'INSERT INTO agendas (scope,time,date,duration,location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [scope,time,date,duration,location]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao inserir agenda."})
        }
});

export default app;