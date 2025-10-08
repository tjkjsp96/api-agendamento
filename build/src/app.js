import express from "express";
const app = express();
app.use(express.json()); //middleware - Acesso as req e res e fazer algumas ações
export default app;
