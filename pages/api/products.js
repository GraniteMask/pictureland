// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from '../../helpers/initDB'
import Product from '../../models/Product'

initDB()

export default (req, res) => {
  switch(req.method){
    case "GET":
      await getallProducts(req,res)
      break;
    case "POST":
      await savaProduct(req,res)
      break;
  }
  
  
}

const getAllProducts = async(req,res)=>{
  Product.find().then(products=>{
    res.status(200).json(products)
  })
}

const saveProduct = async(req,res) =>{
  const {name,price,description,mediaUrl}= req.body
  
  if(!name || !price || !description || !media){
    res.status(422).json({error:"Please add all the fields!!!"})
    return
  }
  const product = await new Product({
    name,
    price,
    description, mediaUrl
  }).save()
  res.status(201).json(product)
}

//201  status means something new is created