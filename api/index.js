import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'

dotenv.config()
mongoose.connect(process.env.YOURPLACE_DB_URI)
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log(err))

const app=express()
app.use(express.json()) //it allows JSON as input of the server
const PORT=process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

//error handling middleware
//in order to use this middleware use 'next' , like in controllers
app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal Server Error"
    return  res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})