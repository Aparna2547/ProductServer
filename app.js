import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose  from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const port = 3000

const app = express()

const connectDb =async () =>{
    try {
        const uri = process.env.mongo_uri
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error);
    }
}
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/user')

app.listen(port,()=>{
    console.log('server is running');
})