import {useRouter} from 'next/router'
import baseUrl from '../../helpers/baseUrl';
import {useRef, useEffect} from 'react'


const Product = ({product}) =>{
    const router = useRouter();
    const modalRef = useRef(null)

    useEffect(()=>{
        M.Modal.init(modalRef.current)
        // console.log(modalRef.current)
    },[])
    
    if(router.isFallback){
        return(
            <h3>loading...</h3>
        )
    }

    const getModal = () =>{
        return(
            <div id="modal1" className="modal" ref={modalRef}>
                <div className="modal-content">
                    <h4>{product.name}</h4>
                    <p>Sure to delete??</p>
                </div>
                <div className="modal-footer">
                    <button className="btn waves-effect waves-light #d32f2f red darken-2" onClick={()=>deleteProduct()}>Yes
                        <i className="material-icons right" >delete</i>
                    </button>
                    <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" >Cancel
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </div>
        )
    }

    const deleteProduct = async () =>{
        const res = await fetch(`${baseUrl}/api/product/${product._id}`, {method:"DELETE"})
        await res.json()
        router.push('/')
    }

    return(
        <div className="container center-align">
            <h1>{product.name}</h1>
            <img src={product.mediaUrl} style={{width:"30%"}}/> 
            <h5>Rs. {product.price}</h5>
            <input type="number" style={{width: "400px", margin:"10px"}} min="1" placeholder="Quantity"/>
            <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1" >Add for shopping
                <i className="material-icons right">add</i>
            </button>
            <p className="left-align">{product.description}</p>
            <button data-target="modal1" className="btn modal-trigger waves-effect waves-light #d32f2f red darken-2" >Delete
                <i className="material-icons left">delete</i>
            </button>

            {getModal()}
        </div>)
}

// export async function getServerSideProps({params:{id}}){

//     const res = await fetch(`http://localhost:3000/api/product/${id}`)
//     const data = await res.json()

//     return{
//         props: {product:data},
//     }
// }

export async function getStaticProps({params:{id}}){

    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()

    return{
        props: {product:data},
    }
}

export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: "609d912ffd9707413ea2401c"} } // See the "paths" section below
      ],
      fallback:  true // See the "fallback" section below
    };
  }

export default Product