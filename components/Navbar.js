import Link from 'next/link'
import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

const NavBar = () =>{
    const router = useRouter()
    const cookieuser = parseCookies()
    // const {token} = parseCookies()
    // let user = false
    const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""

    // if(token){
    //     user = true
    // }else{
    //     user = false
    // }

    function isActive(route){
        if(route == router.pathname){
            return "active"
        }
        else ""
    }
    return(
        <nav>
            <div className="nav-wrapper #5e35b1 deep-purple darken-1">
            <Link href="/"><a className="brand-logo left">Picture Land</a></Link>
            <ul id="nav-mobile" className="right">
            <li className={isActive('/cart')}><Link href="/cart" ><a >cart</a></Link></li>
                {
                    user.role=='user' && user.role=='root' &&
                    <li className={isActive('/create')}><Link href="/create" ><a >create</a></Link></li>
                }
                {
                    user ?
                    <>
                    <li className={isActive('/account')}><Link href="/account" ><a >Account</a></Link></li>
                    <li ><button className="btn red" onClick={()=>{cookie.remove('token'); cookie.remove('user'); router.push('/login')}}>Logout</button></li>
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