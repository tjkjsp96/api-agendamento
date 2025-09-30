import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',    // ou 'postgres' se o Node.js também estiver em container
  port: 5432,
  user: 'myuser',
  password: '123',      // <-- senha atualizada
  database: 'mydatabase'
});

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Erro ao conectar ao PostgreSQL:', err.message);
//   } else {
//     console.log('✅ Conexão bem-sucedida:', res.rows[0].now);
//   }
//   pool.end();
// });


async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS agendas (
      id SERIAL PRIMARY KEY,
      scope TEXT NOT NULL,
      time TEXT NOT NULL,
      date TEXT NOT NULL,
      duration TEXT NOT NULL,
      location TEXT NOT NULL
    )
  `;
  try {
    await pool.query(query);
    console.log('Tabela criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err.message);
  }
}

// Cria a tabela ao iniciar
createTable();

export default pool;