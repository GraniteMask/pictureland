import jwt from 'jsonwebtoken'

export default function Authenticated(icomponent){
    return(req,res)=>{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({error:"you must logged in"})
        }
        try{
            const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
            req.userId = userId
            // console.log(userId)
            return icomponent(req,res) // the code of fetchUsercart and addProduct is cut and paste here in this line3
       
        }catch(err){
           return res.status(401).json({error:"You must logged in"})
        }
    }
}