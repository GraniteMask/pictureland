import {parseCookies} from 'nookies'

const Account = () =>{
    return(
        <h1>Profile Page</h1>)
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