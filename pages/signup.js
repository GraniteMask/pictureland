import Link from 'next/link'
import { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import {useRouter} from 'next/router'

const Signup = () =>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const router = useRouter()

    const userSignup = async (e)=>{
        e.preventDefault()
        const res = await fetch(`${baseUrl}/api/signup`,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password})
        })
        const res2 = await res.json()
        if(res2.error){
            M.toast({html: res2.error, classes:"red"}) 
        }else{
            M.toast({html: res2.message, classes:"green"})
            router.push('/login')
        }
    }
    return(
        <div className="container authcard center-align">
            <h3>SignUp</h3>
            <form onSubmit={(e)=>userSignup(e)}>
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