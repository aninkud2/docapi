const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})

const Db = process.env.DATABASE
mongoose.set("strictQuery",true)
mongoose.connect(Db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{ 
    console.log("Conneted to mongo db");
})
 
const app = require('./app')

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Conneted to '+process.env.PORT || 5000,)
})    

































































