require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cron = require('./email/checkAndSend');
const cronRem = require('./email/reminderSend');
const cors = require('cors');
const { jwtDecode } = require('jwt-decode');

const authRouter = require('./auth/authRouter')
const carsRouter = require('./Сars/carsRouter')
const userRouter = require('./User/userRouter')
const intervalRouter = require ('./Interval/intervalRouter')
const reminderRouter = require ('./reminder/reminderRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: 'http://projecttspp'
  }));
app.use(express.json())
app.use("/auth", authRouter)
app.use (carsRouter)
app.use (userRouter)
app.use (intervalRouter)
app.use (reminderRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()