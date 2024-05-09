import cors from 'cors'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'

 dotenv.config()

 const client = new Client({
    connectionString: process.env.PGURI
  })

  client.connect()

  const app = express()

  app.use(cors())

  app.get('/', async (req,res) => {
    const {rows} = await client.query('SELECT * FROM accounts')
    res.send(rows)
  })

  app.listen(3000, ()=>{
    console.log("Ready for database");

  })
