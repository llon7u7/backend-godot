const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "127.0.0.1",
  port: 5432,
  database: "postgres"
});

// 🧩 Ruta para registrar usuario
app.post("/registro", async (req, res) => {
  try {
    const { nombre, edad, peso, altura, sexo, objetivo } = req.body;
    await pool.query(
      "INSERT INTO usuario(nombre, edad, peso, altura, sexo, objetivo) VALUES ($1, $2, $3, $4, $5, $6)",
      [nombre, edad, peso, altura, sexo, objetivo]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al insertar:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});