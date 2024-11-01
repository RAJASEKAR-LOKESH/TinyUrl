const express=require('express')
const connection=require('./db/connection')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/auth')
const urlRoutes=require('./routes/urlRoutes')

const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

const app=express();

const PORT=process.env.PORT || 5000
connection()
app.use(express.json())
app.use(cors());

app.use("/user",userRoutes);
app.use("/auth",authRoutes);
app.use("/url",urlRoutes);

app.listen(PORT,()=>{
    console.log("Server Started at",PORT)
})
