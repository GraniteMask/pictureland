import Link from 'next/link'
import {useRouter} from 'next/router'

const NavBar = () =>{
    const router = useRouter()
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
            <ul id="nav-mobile" class="right">
                <li className={isActive('/login')}><Link href="/login" ><a >Login</a></Link></li>
                <li className={isActive('/signup')}><Link href="/signup" ><a >Signup</a></Link></li>
                <li className={isActive('/create')}><Link href="/create" ><a >create</a></Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default NavBar