import Product from '..//../../models/Product'

export default (req,res)=>{
    const {pid} = req.query
    const product = await Product.findOne({_id:pid})
    res.status(200).json(product)
}