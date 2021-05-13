import mongoose from 'mongoose'

function initDB(){
 mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true
 })
 mongoose.connection.on('connected',()=>{
     console.log("connected to Mongo")
 })
 mongoose.connection.on('error',(err)=>{
     console.log("error:",err)
 })
}

export default initDB