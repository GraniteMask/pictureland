import NavBar from "./Navbar"

const layout = ({children}) =>{
    return(
        <>
            <NavBar />
            {children}
        </>
    )
}

export default layout