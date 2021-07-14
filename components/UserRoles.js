import {useEffect,useState} from 'react'
import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrl'

function UserRoles(){
    const {token} = parseCookies();
    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUser = () =>{
        const res = await fetch(`${baseUrl}/api/users`,{
            headers:{
                "Authorization":token
            }
        })
        const res2 = await res.json()
        console.log(res2)
    }
    return(
        <h1>User Roles</h1>
    )
}

export default UserRoles