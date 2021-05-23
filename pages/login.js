import Link from 'next/Link'
import { useState } from 'react'

const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return(
        <div className="container authcard center-align">
            <h3>Login</h3>
            <form>
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