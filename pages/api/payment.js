import Stripe from "stripe";
import {v4 as uuidv4} from 'uuid'
import Cart from '../../models/Cart'

const stripe = String(process.env.STRIPE_SECRET)

export default async(req, res)=>{
    const {paymentInfo} = req.body
    const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({error:"You must logged in"})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
            const cart = await Cart.findOne({user:userId}).populate("products.product")
            let price = 0
            cart.products.forEach(item=>{
                price = price + item.quantity * item.product.price
            })
            const prevCustomer = await stripe.customers.list({
                email:paymentInfo.email
            })

            const isExistingCustomer = prevCustomer.data.length > 0

            if(!isExistingCustomer){
                const newCustomer = await stripe.customer.create({
                    email: paymentInfo.email,
                    source:paymentInfo.id
                })
            }

            const charge = await stripe.charges.create({
                currency:"INR",
                amount: price * 100,
                receipt_email: paymentInfo.email,
                customer:isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description:`You purchased a product with ${paymentInfo.email} having a price of Rs.${price*100}`
            },{
                idempotencyKey:uuidv4()
            })

            res.json(200).json({message:"Payment was Successful"})

       
        }catch(err){
           return res.status(401).json({error:"Error Processing Payment"})
        }
}