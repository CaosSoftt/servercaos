// server.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

const pool = mysql.createPool({
  host: '35.168.152.247',
  user: 'tocino',
  password: 'soft',
  database: 'caosdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());

app.get('/api/datos', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Seleccionar todas las columnas de la tabla datos
    const [rows, fields] = await connection.execute('SELECT * FROM datos');

    connection.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});

