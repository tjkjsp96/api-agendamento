import express from "express";

const app = express();
app.use(express.json()); //middleware - Acesso as req e res e fazer algumas ações

const agendas = [
    {
        id: 1,
        scope: "Agenda Ricardo",
        time: "10:00",
        date: "2025-01-01",
        duration: "30m",
        location: "Sala 1"
    },
    {
        id: 2,
        scope: "Agenda Leticia",
        time: "10:30",
        date: "2025-01-01",
        duration: "30m",
        location: "Sala 1"
    }
]

function buscaAgenda(id){
    return agendas.findIndex(agenda => {
        return agenda.id === Number(id);
    });
}

// cod http 200 - satus de ok, tudo certo!
// cod http 201 - status de registro criado
// cod http 200 ou 204 - status de ok para o 200 e 204 é sem conteudo

app.get("/", (req, res) =>{
    res.status(200).send("Agendamento.js"); 
});

app.get("/agendas", (req, res) => {
    res.status(200).json(agendas);
});

app.post("/agendas", (req, res) => {
    agendas.push(req.body);
    res.status(201).send("Agendamento concluido com sucesso!"); 
});

app.get("/agendas/:id", (req, res) => {
    const index = buscaAgenda(req.params.id);
    res.status(200).json(agendas[index]);
});

app.put("/agendas/:id", (req, res) => {
    const index = buscaAgenda(req.params.id);
    agendas[index].time = req.body.time;
    res.status(200).json(agendas);
});

app.delete("/agendas/:id", (req, res) => {
    const index = buscaAgenda(req.params.id);
    agendas.splice(index, 1); // pop deleta o ultimo elemento do array
    res.status(200).send("Deletado com sucesso.");
});

export default app;

