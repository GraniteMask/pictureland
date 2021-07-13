import {parseCookies} from 'nookies'

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
   return{
       props: {}
   }
}

export default Account