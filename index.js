const express = require('express')
const app= express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute= require('./routes/auth')
const postRoute= require('./routes/posts')

//const User= require('./models/users')
mongoose.connect('mongodb+srv://avenger:N8OwsN4qhIIjEdQP@cluster0.99eix.mongodb.net/tutorial?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(()=> {
    console.log("Connection done");
})

app.use(express.json())
app.use(morgan("common"))
app.use(helmet())
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.get("/",(req,res)=>{
    res.send("Welcome to Homepage")
})
app.listen(8080,()=>{
    console.log('Backend server is running')
})