import Link from 'next/link'
import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'

const NavBar = () =>{
    const router = useRouter()
    const {token} = parseCookies()
    let user = false

    if(token){
        user = true
    }else{
        user = false
    }

    function isActive(route){
        if(route == router.pathname){
            return "active"
        }
        else ""
    }
    return(
        <nav>
            <div className="nav-wrapper #5e35b1 deep-purple darken-1">
            <Link href="/"><a className="brand-logo left">Logo</a></Link>
            <ul id="nav-mobile" className="right">
                {
                    user && 
                    <li className={isActive('/create')}><Link href="/create" ><a >create</a></Link></li>
                }
                {
                    user ?
                    <>
                    <li className={isActive('/login')}><Link href="/login" ><a >Account</a></Link></li>
                    <li ><button className="btn">Logout</button></li>
                    </>
                    :
                    <>
                    <li className={isActive('/login')}><Link href="/login" ><a >Login</a></Link></li>
                    <li className={isActive('/signup')}><Link href="/signup" ><a >Signup</a></Link></li>
                    </>
                }
                
                
            </ul>
            </div>
        </nav>
    )
}

export default NavBar