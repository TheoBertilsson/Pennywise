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
app.use(express.json());
app.use(cors());
// GET
app.get("/", async (req, res) => {
  const { rows } = await client.query("SELECT * FROM accounts");
  res.send(rows);
});

app.get("/authenticate", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(401).send("Invalid token");
    }
    const { rows } = await client.query("SELECT * FROM tokens WHERE token=$1", [
      token,
    ]);
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
});

app.get("/login", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM accounts WHERE username=$1 AND password=$2",
      [req.query.username, req.query.password]
    );
    if (rows.length === 0) {
      return res.status(401).send("Invalid username or password");
    }
    await client.query("DELETE FROM tokens WHERE account_id=$1", [rows[0].id]);
    let i = uuidv4();
    const insertResult = await client.query(
      "INSERT INTO tokens (account_id,token) VALUES ($1,$2) RETURNING token",
      [rows[0].id, i]
    );
    const token = insertResult.rows[0].token;
    res.send({ token: token });
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
});

// POST
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).send("Missing email, username, or password");
    }

    const insertAccount = await client.query(
      "INSERT INTO accounts (email, username, password) VALUES ($1, $2, $3)",
      [email, username, password]
    );

    res.status(201).send("Created account!");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(400).send("Error");
  }
});

app.post("/addBudget", async (req, res) => {
  try {
    const { account_id, item, cost, monthly, category } = req.body;
    if (!account_id || !item || !cost || !category) {
      return res.status(400).send("Missing item, cost, or category");
    }
    const insertBudget = await client.query(
      "INSERT INTO budget  (account_id, item, cost, monthly, category) VALUES ($1, $2, $3, $4, $5)",
      [account_id, item, cost, monthly, category]
    );
    res.send("Created item")
  } catch (error) {
    console.error("Error executing query", error);
    res.status(400).send("Error");
  }
});
// DELETE
// LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
