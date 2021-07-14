import Link from 'next/link'
import { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'

const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()

    const userLogin = async (e) =>{
        e.preventDefault()
        const res = await fetch(`${baseUrl}/api/login`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({email,password})
        })

        const res2 = await res.json()
        if(res2.error){
            M.toast({html: res2.error, classes:"red"}) 
        }else{
            console.log(res2)
            cookie.set('token',res2.token)
            cookie.set('user',res2.user)
            router.push('/account')
        }
    }

    return(
        <div className="container authcard center-align">
            <h3>Login</h3>
            <form onSubmit={(e)=>userLogin(e)}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action">Login
                    <i className="material-icons right">forward</i>
                </button>
                <Link href="/signup"><a><h5>Don't have an account?</h5></a></Link>
            </form>
            
            
        </div>
    )
}

export default Login