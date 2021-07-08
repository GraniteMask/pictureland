import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
const Cart = () =>{
    return(
        <h1>cart page</h1>
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
    console.log(products)
    return {
        props:{products}
    }
}

export default Cart