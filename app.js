const express=require('express')
require('dotenv').config()
const {body, validationResult}=require('express-validator')
const cors =require ('cors')
const app = express()

const mongoose = require ("mongoose")

const url =process.env.mongoUrl

mongoose.connect(url).then(()=>{
    console.log('conected to db')
})
app.use(cors())

app.use(express.json())


port=process.env.port
app.listen(port,()=>{
    console.log(`listening on port${port}` )
})
