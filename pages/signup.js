import Link from 'next/Link'
import { useState } from 'react'

const Signup = () =>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return(
        <div className="container authcard center-align">
            <h3>SignUp</h3>
            <form>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" type="submit" name="action">Signup
                    <i className="material-icons right">forward</i>
                </button>
                <Link href="/login"><a><h5>Already have an account?</h5></a></Link>
            </form>
        </div>
    )
}

export default Signup