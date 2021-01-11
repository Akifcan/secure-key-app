import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, _ => console.log(`Working on ${PORT}`))