"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
dotenv.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path.join(path.resolve(), "dist")));
//  GET
app.get("/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(401).send("Invalid token");
        }
        const { rows } = yield client.query("SELECT * FROM tokens WHERE token=$1", [
            token,
        ]);
        res.send(rows);
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Internal Server Error");
    }
}));
app.get("/loginAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query("SELECT * FROM accounts WHERE username=$1 AND password=$2", [req.query.username, req.query.password]);
        if (rows.length === 0) {
            return res.status(401).send("Invalid username or password");
        }
        yield client.query("DELETE FROM tokens WHERE account_id=$1", [rows[0].id]);
        let i = (0, uuid_1.v4)();
        const insertResult = yield client.query("INSERT INTO tokens (account_id,token) VALUES ($1,$2) RETURNING token", [rows[0].id, i]);
        const token = insertResult.rows[0].token;
        res.send({ token: token });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Internal Server Error");
    }
}));
app.get("/getTotal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, month, day } = req.query;
        if (!id) {
            return res.status(401).send("Invalid id");
        }
        const monthNumber = Number(month);
        const dayNumber = Number(day);
        if (dayNumber > 24) {
            let nextMonthNumber;
            let thisMonthString;
            let nextMonthString;
            if (monthNumber === 12) {
                nextMonthNumber = 1;
                nextMonthString = "01";
            }
            else {
                nextMonthNumber = monthNumber + 1;
                nextMonthString =
                    nextMonthNumber < 10 ? `0${nextMonthNumber}` : `${nextMonthNumber}`;
            }
            thisMonthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
            const startDate = `2024-${thisMonthString}-25`;
            const endDate = `2024-${nextMonthString}-25`;
            const { rows: totalItems } = yield client.query("SELECT * FROM budget WHERE account_id=$1 AND created_at >= $2 AND created_at < $3 AND monthly=FALSE", [id, startDate, endDate]);
            const { rows: monthlyItems } = yield client.query("SELECT * FROM budget WHERE account_id=$1 AND monthly=TRUE AND created_at <= $2", [id, endDate]);
            const combinedResults = [...totalItems, ...monthlyItems];
            return res.send(combinedResults);
        }
        else if (dayNumber < 25) {
            let lastMonthNumber, thisMonthString, lastmonthString;
            if (monthNumber === 1) {
                lastMonthNumber = 12;
                lastmonthString = "12";
            }
            else {
                lastMonthNumber = monthNumber - 1;
                lastmonthString =
                    lastMonthNumber < 10 ? `0${lastMonthNumber}` : `${lastMonthNumber}`;
            }
            thisMonthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
            const startDate = `2024-${lastmonthString}-25`;
            const endDate = `2024-${thisMonthString}-24`;
            const { rows: totalItems } = yield client.query("SELECT * FROM budget WHERE account_id=$1 AND created_at >= $2 AND created_at < $3 AND monthly=FALSE", [id, startDate, endDate]);
            const { rows: monthlyItems } = yield client.query("SELECT * FROM budget WHERE account_id=$1 AND monthly=TRUE AND created_at <= $2", [id, endDate]);
            const combinedResults = [...totalItems, ...monthlyItems];
            return res.send(combinedResults);
        }
        res.status(400).send("Invalid day value");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
// POST
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send("Missing email, username, or password");
        }
        yield client.query("INSERT INTO accounts (email, username, password) VALUES ($1, $2, $3)", [email, username, password]);
        res.status(201).send("Created account!");
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(400).send("Error");
    }
}));
app.post("/addBudget", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account_id, item, cost, monthly, category, month } = req.body;
        const date = `2024-${month}-24 12:00:00`;
        if (!account_id || !item || !cost || !category) {
            return res.status(400).send("Missing item, cost, or category");
        }
        yield client.query("INSERT INTO budget  (account_id, item, cost, monthly, category, created_at) VALUES ($1, $2, $3, $4, $5, $6)", [account_id, item, cost, monthly, category, date]);
        res.send("Created item");
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(400).send("Error");
    }
}));
// DELETE
app.delete("/removeItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, item_id } = req.body;
        if (!id || !item_id) {
            return res.status(400).send("Missing item or ID");
        }
        yield client.query("DELETE FROM budget WHERE account_id=$1 AND id=$2", [
            id,
            item_id,
        ]);
        res.send("Removed item");
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(400).send("Error");
    }
}));
app.delete("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).send("Missing Token");
        }
        yield client.query("DELETE FROM tokens WHERE token=$1", [token]);
        res.send("Logged out");
    }
    catch (error) {
        console.error("Error executing query", error);
        res.status(400).send("Error");
    }
}));
// LISTEN
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
