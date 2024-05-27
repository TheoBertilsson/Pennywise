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

app.get("/getTotal", async (req, res) => {
  try {
    const { id, month, day } = req.query;
    if (!id) {
      return res.status(401).send("Invalid id");
    }

    const monthNumber = Number(month)
    const dayNumber = Number(day);
    if (dayNumber > 24) {
      let nextMonthNumber;
      let thisMonthString;
      let nextMonthString;
      if (monthNumber === 12) {
        nextMonthNumber = 1;
        nextMonthString = "01";
      } else {
        nextMonthNumber = monthNumber + 1;
        nextMonthString = nextMonthNumber < 10 ? `0${nextMonthNumber}` : `${nextMonthNumber}`;
      }

      thisMonthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
      const startDate = `2024-${thisMonthString}-25`;
      const endDate = `2024-${nextMonthString}-25`;

      const { rows } = await client.query(
        "SELECT * FROM budget WHERE account_id=$1 AND created_at >= $2 AND created_at < $3",
        [id, startDate, endDate]
      );
      return res.send(rows);
    } else if(dayNumber < 25) {
      let lastMonthNumber,thisMonthString,lastmonthString;
      if (monthNumber === 1){
        lastMonthNumber = 12;
        lastmonthString="12"
      } else {
        lastMonthNumber = monthNumber - 1;
        lastmonthString = lastMonthNumber < 10 ? `0${lastMonthNumber}` : `${lastMonthNumber}`
      }
      thisMonthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;

      const startDate = `2024-${lastmonthString}-25`;
      const endDate = `2024-${thisMonthString}-24`;

      const { rows } = await client.query(
        "SELECT * FROM budget WHERE account_id=$1 AND created_at >= $2 AND created_at < $3",
        [id, startDate, endDate]
      );
      return res.send(rows);
    }

    res.status(400).send("Invalid day value");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/getHousing", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(401).send("Invalid id");
    }
    const { rows } = await client.query(
      "SELECT * FROM budget WHERE account_id=$1 AND category='housing'",
      [id]
    );
    res.send(rows);
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
    res.send("Created item");
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
