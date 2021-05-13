import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    mediaUrl:{
        type: String,
        required: true
    }
})

export default mongoose.models.product|| mongoose.model('product', productsSchema)

//since it will be required to import this file multiple times in different file so it will give error. To save from that we use the the left hand side of || logic code.