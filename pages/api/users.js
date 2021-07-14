import User from '../../models/User'
import Authenticated from '../../helpers/Authenticated'


export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await fetchUsers(req,res)
            break
        case "PUT":
            await changeRole(req,res)
            break
       
    }
}

const fetchUsers = Authenticated(async(req,res)=>{
    const users = await User.find({_id:{$ne:req.userId}})
    res.status(200).json(users)
})

const changeRole = Authenticated(async(req,res)=>{
    const {_id,role} = req.body
    const newRole = role == "user" ? "admin" :"user"
    const users = await User.findOneAndUpdate(
        {_id},
        {role:newRole},
        {new:true}
    )
    res.status(200).json(users)
})