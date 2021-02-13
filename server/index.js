import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
dotenv.config()

import router from './router'
const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(express.json())
app.use(morgan('dev'))
app.use(router)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ status: false, message: err.message })
})


const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(connected => {
        console.log(connected.connection.host);
        app.listen(PORT, _ => console.log(`Working on ${PORT}`))
    })

//https://github.com/login/oauth/authorize?client_id=f38ddb59c8e338e28e06