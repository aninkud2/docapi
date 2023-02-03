const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const cors = require('cors')
const Router = require('./docRouter/docRouter')
const fileuploader = require('express-fileupload'); 



const app = express()

app.use(cors)
app.use(express.json()) 




app.use(fileuploader({
    useTempFiles: true
}))

app.use('/api', Router)


app.use('/',(req,res)=>{
    res.status(200).send("My Api is working")
})


module.exports = app