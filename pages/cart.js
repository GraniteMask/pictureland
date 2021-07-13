import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Cart = ({error,products}) =>{
    const [cartProducts,setCartProducts] = useState(products)

    
    let price = 0
    const {token} = parseCookies()
    const router = useRouter()

    if(!token){
        return(
            <div className="center-align">
                <h3>Please Login to view your cart</h3>
                <Link href="/login"><a><button className="btn">Login</button></a></Link>
            </div>
        )
    }

    if(error){
        M.toast({html:error,classes:"red"})
        cookie.remove("user")
        cookie.remove("token")
        router.push('/login')
    }

    const handleRemove = async(pid) =>{
        const res = await fetch(`${baseUrl}/api/cart`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                productId:pid
            })
        })

        const res2 = await res.json()
        setCartProducts(res2)
        // console.log(res2)
    }

    const CartItems = () =>{
        // console.log(cProducts.map(item=>item.product.name))
        return(
            <>
                {   
                    cartProducts.map(item=>{
                        price = price + item.quantity * item.product.price
                        return(
                            <div style={{display:"flex", margin:"20px"}}>
                                <img src={item.product.mediaUrl} style={{width:"30%"}}/>
                                <div style={{marginLeft:"20px"}}>
                                    <h6>{item.product.name}</h6>
                                    <h6>{item.quantity} x {item.product.price}</h6>
                                    <button className="btn red" onClick={()=>{handleRemove(item.product._id)}}>Remove</button>
                                </div>
                            </div>)
                    })
                }
            </>
        )
    }

    const TotalPrice = () =>{
        return(
            <>
            <div className="container" style={{display:"flex", justifyContent:"space-between"}}>
                <h5>total Rs.{price}</h5>

                <StripeCheckout name="pictureland" amount={price} image={products[0].product.mediaUrl} currency="INR" shippingAddress={true} billingAddress={true} zipCode={true}>
                <button className="btn">Checkout</button>
                </StripeCheckout>
            </div>
            </>
            )
            
    }

    return(
        // <h1>cart page</h1>
        <>
            <div className="container">
                <CartItems />
                <TotalPrice />
            </div>
            
        </>
        )
}

export async function getServerSideProps(ctx){
    const {token} =parseCookies(ctx)

    if(!token){
        return{
            props:{products:[]}
        }
    }
    const res = await fetch(`${baseUrl}/api/cart`,{
        headers: {
            "Authorization": token
        }
    })
    const products = await res.json()
    if(products.error){
        return{
           props:{error:products.error} 
        }
    }
    console.log(products)
    return {
        props:{products}
    }
}

export default Cart