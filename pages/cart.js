import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Link from 'next/link'

const Cart = ({error}) =>{
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