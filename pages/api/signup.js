import initDb from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

initDb()

export default async (req, res)=>{
    const {name,email,password} = req.body

    try{
        if(!name || !email || !password){
            return res.status(422).json({error:"Please add all the fields"})
        }
        const User = await User.fondOne({email})
        if(user){
            return res.status(422).json({error:"User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,15)
        const newUser = await new User({
            name,
            email,
            password:hashedPassword
        })
        console.log(newUser)
        res.status(201).json({message:"Signup Success"})
    }catch(err){
        console.log(err)
    }
}