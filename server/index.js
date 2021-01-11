import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import router from './router'
const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, _ => console.log(`Working on ${PORT}`))

//https://github.com/login/oauth/authorize?client_id=f38ddb59c8e338e28e06