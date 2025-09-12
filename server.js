import app from "./src/app.js";

const PORT = 3000; // 5432 - porta do PostgreSQL

app.listen(PORT, () => {
    console.log("Servidor online!")
});

