import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.YOURPLACE_DB_URI)
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log(err))

const app=express()



const PORT=process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})