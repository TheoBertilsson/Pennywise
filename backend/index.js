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
dotenv.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// GET
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT * FROM accounts");
    res.send(rows);
}));
app.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query("SELECT * FROM accounts WHERE username=$1 AND password=$2", [req.query.username, req.query.password]);
        // No matching user found
        if (rows.length === 0) {
            return res.status(401).send("Invalid username or password");
        }
        yield client.query('DELETE FROM tokens WHERE account_id=$1', [rows[0].id]);
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
// POST
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertAccount = yield client.query("INSERT INTE accounts (email,username,password) VALUES ($1,$2,$3)", [req.query.email, req.query.username, req.query.password]);
        res.status(201).send("Created account!");
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}));
// DELETE
// LISTEN
app.listen(3000, () => {
    console.log("Ready for database");
});
