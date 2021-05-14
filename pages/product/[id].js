const Product = ({product}) =>{
    return(
        <div>
            <h1>{product.name}</h1>
        </div>)
}

export async function getServerSideProps({params:{id}}){

    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json()

    return{
        props: {product:data},
    }
}

export default Product