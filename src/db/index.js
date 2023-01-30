import pkg from 'pg';
const { Pool } = pkg;
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from '../config/index.js';


export async function getDataFromDb(client) {
  const pool = new Pool({
    user: pgUser,
    host: pgHost,
    database: pgDatabase,
    password: pgPassword,
    port: pgPort,
  });
  
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const currentYear = new Date().getFullYear();
  const startOfCurrentYear = new Date(currentYear, 0, 1);

  console.log('Retrieving data from database...');

  const sql = `
    SELECT DISTINCT TRIM(upper(u.nome_usuario)) AS name,
    c.nome_cliente AS client
    FROM usuarios_tokens ut
    JOIN usuarios u ON u.id_usuario = ut.id_usuarios
    JOIN usuarios_sistemas_clientes usc ON usc.id_usuario = u.id_usuario
    JOIN clientes c ON c.id_cliente = usc.id_cliente
    WHERE data_hora_usuarios_tokens < $1 AND data_hora_usuarios_tokens >= $2 AND
    usc.id_cliente = ${client} AND
    usc.id_sistemas = 1`;

  try {
    const result = await pool.query(sql, [twoDaysAgo, startOfCurrentYear]);
    console.log('Data retrieved successfully');
    return result.rows;
  } catch (error) {
    console.error(`Error while retrieving data: ${error}`);
    return [];
  } finally {
    await pool.end();
  }
}
