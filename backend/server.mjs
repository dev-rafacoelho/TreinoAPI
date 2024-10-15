import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
dotenv.config();

const pool = new Pool({
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

export const query = (text, params) => pool.query(text, params);
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const users = [username, password];
  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    users,
    (err, results) => {
      if (err) {
        console.error("Erro ao registrar chamada:", err);
        res.status(500).send("Erro interno do servidor");
      } else {
        res.send("Chamada registrada com sucesso");
      }
    }
  );
});

app.get("/getusers", (req, res) => {
  pool.query("SELECT id,username,password FROM users", (err, results) => {
    if (err) {
      console.error("Erro ao buscar chamadas:", err);
      res.status(500).send("Erro interno do servidor");
    } else {
      res.json(results.rows);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
