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

app.put("/update", (req, res) => {
  const { username, password, id } = req.body;
  const users = [username, password, id];
  pool.query(
    "UPDATE users SET username = $1, password = $2 WHERE id = $3",
    users,
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar chamada:", err);
        res.status(500).send("Erro interno do servidor");
      } else {
        res.send("Chamada atualizada com sucesso");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = [req.params.id];
  pool.query(
    "DELETE FROM users WHERE id = $1",
    id,
    (err) => {
      if (err) {
        console.error("Erro ao deletar chamada:", err);
        res.status(500).send("Erro interno do servidor");
      } else {
        res.send("Chamada deletada com sucesso");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
