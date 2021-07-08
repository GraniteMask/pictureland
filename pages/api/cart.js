import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'

export default async (req,res)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"you must logged in"})
    }
    try{
         const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
         const cart = await Cart.findOne({user:userId})
         res.status(200).json(cart.products)
    }catch(err){
        return res.status(401).json({error:"You must logged in"})
    }
   

}