
import express from "express";
import pool from "./config/dbConnect.js";

const app = express();
app.use(express.json()); //middleware - Acesso as req e res e fazer algumas ações

// const agendas = [
//     {
//         id: 1,
//         scope: "Agenda Ricardo",
//         time: "10:00",
//         date: "2025-01-01",
//         duration: "30m",
//         location: "Sala 1"
//     },
//     {
//         id: 2,
//         scope: "Agenda Leticia",
//         time: "10:30",
//         date: "2025-01-01",
//         duration: "30m",
//         location: "Sala 1"
//     }
// ]

function buscaAgenda(id){
    return agendas.findIndex(agenda => {
        return agenda.id === Number(id);
    });
}

// cod http 200 - satus de ok, tudo certo!
// cod http 201 - status de registro criado
// cod http 200 ou 204 - status de ok para o 200 e 204 é sem conteudo

// app.get("/", (req, res) =>{
//     res.status(200).send("Agendamento.js"); 
// });

// app.get("/agendas", (req, res) => {
//     res.status(200).json(agendas);
// });

// app.post("/agendas", (req, res) => {
//     agendas.push(req.body);
//     res.status(201).send("Agendamento concluido com sucesso!"); 
// });

// app.get("/agendas/:id", (req, res) => {
//     const index = buscaAgenda(req.params.id);
//     res.status(200).json(agendas[index]);
// });

// app.put("/agendas/:id", (req, res) => {
//     const index = buscaAgenda(req.params.id);
//     agendas[index].time = req.body.time;
//     res.status(200).json(agendas);
// });

// app.delete("/agendas/:id", (req, res) => {
//     const index = buscaAgenda(req.params.id);
//     agendas.splice(index, 1); // pop deleta o ultimo elemento do array
//     res.status(200).send("Deletado com sucesso.");
// });

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

app.post("/agendas", async (req, res) => {
    try {
        const{scope,time,date,duration,location} = req.body;

        const result = await pool.query(
            'INSERT INTO agendas (scope,time,date,duration,location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [scope, time, date, duration, location]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Erro ao inserir agenda."})
        }
});

app.put("/agendas/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const campos = [];
        const valores = [];
        let i = 1;

        if (req.body.scope) {
            campos.push(`scope = $${i++}`);
            valores.push(res.body.scope);
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

app.delete("/agendas/:id", async (req, res) =>{
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


export default app;

