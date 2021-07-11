import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'

export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await fetchUserCart(req,res)
            break
        case "PUT":
            await addProduct(req,res)
    }
}

function Authenticated(icomponent){
    return(req,res)=>{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({error:"you must logged in"})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
            req.userId = userId
            return icomponent(req,res) // the code of fetchUsercart and addProduct is cut and paste here in this line3
        }catch(err){
           return res.status(401).json({error:"You must logged in"})
        }
    }
}

const fetchUserCart = Authenticated(async (req,res)=>{
    
    const cart = await Cart.findOne({user:userId})
    res.status(200).json(cart.products)   
})

const addProduct = Authenticated(async(req,res) =>{
    const {quantity,productId} = req.body   

    const cart = await Cart.findOne({user:req.userId})
    const pExists = cart.products.some(pdoc=>productId === pdoc.product.toString())

    if(pExists){
        await Cart.findOneAndUpdate(
            {_id:cart._id,"products.product":productId},
            {$inc:{"products.$.quantity":quantity}}
        )
    }else{
       const newProduct = {quantity,product:productId} 
       await Cart.findOneAndUpdate({_id:cart._id},
        {$push:{products:newProduct}})
    }
    res.status(200).json({message:"Product added to cart"})

})

