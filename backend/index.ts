import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors());
// GET
app.get("/", async (req, res) => {
  const { rows } = await client.query("SELECT * FROM accounts");
  res.send(rows);
});

app.get("/login", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM accounts WHERE username=$1 AND password=$2",
      [req.query.username, req.query.password]
    );
    // No matching user found
    if (rows.length === 0) {
      return res.status(401).send("Invalid username or password");
    }
    await client.query('DELETE FROM tokens WHERE account_id=$1',[rows[0].id])
    let i = uuidv4();
    const insertResult = await client.query(
      "INSERT INTO tokens (account_id,token) VALUES ($1,$2) RETURNING token",
      [rows[0].id, i]
    );
    const token = insertResult.rows[0].token;
    res.send({token:token});
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
});

// POST
app.post("/signup", async (req, res) => {
  try {
    const insertAccount = await client.query(
      "INSERT INTE accounts (email,username,password) VALUES ($1,$2,$3)",
      [req.query.email, req.query.username, req.query.password]
    );
    res.status(201).send("Created account!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
});
// DELETE
// LISTEN
app.listen(3000, () => {
  console.log("Ready for database");
});
