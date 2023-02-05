const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const cors = require('cors')
const Router = require('./docRouter/router')
const fileuploader = require('express-fileupload'); 



const app = express()

 app.use(cors())
app.use(express.json()) 
 



app.use(fileuploader({ 
    useTempFiles: true
}))

app.get('/', (req, res)=>{
    res.status(200).send("My Api is connected successfully")
})


app.use('/api', Router)

module.exports = app