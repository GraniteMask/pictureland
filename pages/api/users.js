import User from '../../models/User'
import Authenticated from '../../helpers/Authenticated'

export default Authenticated(async(req,res)=>{
    const users = await User.find({_id:{$ne:req.userId}})
    res.status(200).json(users)
})