import express from 'express'
import cors from 'cors'
import contacts from './api/contacts.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/contacts', contacts)
app.use('*', (req, res) => res.status(404).json({ error: "not found" }))

export default app