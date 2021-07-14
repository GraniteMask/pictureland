import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrl'
import { useEffect, useRef } from 'react'

const Account = ({orders}) =>{
    const orderCard = useRef(null)
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""

    useEffect(()=>{
        M.Collapsible.init(orderCard.current)
    },[])

    const OrderHistory = () =>{
        return(
            <ul class="collapsible" ref={orderCard}>
                {orders.map(item=>{
                    return(
                        <li>
                            <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                            <div className="collapsible-body">
                                <h5>Total Rs. {item.total}</h5>
                                {
                                    item.products.map(pitem=>{
                                        return <h6>{pitem.product.name} x {pitem.quantity}</h6>
                                    })
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>    
        )
    }
    return(
        // <h1>Profile Page</h1>
        <div className="container">
            <div className="center-align">
                <h4>{user.name}</h4>
                <h4>{user.email}</h4>
                <OrderHistory />
            </div>
        </div>
        )

    
}

export async function getServerSideProps(ctx){
   const {token} = parseCookies(ctx)
   if(!token){
       const {res} = ctx
       res.writeHead(302,{Location:"/login"}) //to redirect is user isn't logged/not have token
       res.end()
   }

   const res = await fetch(`${baseUrl}/api/orders`,{
       headers:{
           "Authorization":token
       }
   })
   const res2 =  await res.json()
   console.log(res2)

   return{
       props: {orders:res2}
   }
}

export default Account