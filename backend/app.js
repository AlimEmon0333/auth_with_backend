const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/authRouter")
const cors = require("cors")

require("dotenv").config()
const App = express()
App.use(cors())
App.use(express.json())
App.use("/auth", authRoute)

mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
        App.listen(process.env.PORT, () => {
            console.log(`database connected and app is listening http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })