import mongoose from 'mongoose'

function initDB(){
    if(mongoose.connections[0].readyState){
        console.log('Already Connected')
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to Mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error:",err)
    })
}

export default initDB