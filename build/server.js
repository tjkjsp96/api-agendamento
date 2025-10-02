import express from "express";
import appGetRouter from "./src/app-get.js";
import appPostRouter from "./src/app-post.js";
import appPutRouter from "./src/app-put.js";
import appDeleteRouter from "./src/app-delete.js";
var app = express();
var PORT = 3000; // 5432 - porta do PostgreSQL
app.use(express.json());
app.use(appGetRouter);
app.use(appPostRouter);
app.use(appPutRouter);
app.use(appDeleteRouter);
app.listen(PORT, function () {
    console.log("Servidor online!");
});
export default app;
