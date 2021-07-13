import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrl'

const Account = () =>{
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""
    return(
        // <h1>Profile Page</h1>
        <div className="container">
            <div className="center-align">
                <h4>{user.name}</h4>
                <h4>{user.email}</h4>
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
       props: {}
   }
}

export default Account