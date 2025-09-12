import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'postgres',    // ou 'postgres' se o Node.js também estiver em container
  port: 5432,
  user: 'docker',
  password: '123',      // <-- senha atualizada
  database: 'polls'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.message);
  } else {
    console.log('✅ Conexão bem-sucedida:', res.rows[0].now);
  }
  pool.end();
});
