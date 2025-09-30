
import express from "express";
import pool from "./config/dbConnect.js";

const app = express();
app.use(express.json());

app.get("/agendas", async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM agendas');

        res.status(200).json(result.rows);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao buscar agendas."})
        }
});

app.get("/agendas/:id", async (req, res) => {
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

export default app;