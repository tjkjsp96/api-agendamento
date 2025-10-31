import express from 'express';
import pool from './config/dbConnect.js';

const app = express();
app.use(express.json()); //middleware - Acesso as req e res e fazer algumas ações

export default app;
