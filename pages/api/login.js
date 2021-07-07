import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async (req, res)=>{
    const {email,password} = req.body

    try{
        if(!email || !password){
            return res.status(422).json({error:"Please add all the fields"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"User Not Found"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(passwordCompare){
            const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{
                expiresIn:'2d'
            })
            res.status(201).json({token})
        }else{
            res.status(401).json({error:"Email or Password don't match"})
        }
        res.status(201).json({message:"Signup Success"})
    }catch(err){
        console.log(err)
    }
}