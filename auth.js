const jwt=require('jsonwebtoken')
const User=require('./database/user-model.js')

const auth =async (req,res,next)=>{
    console.log('MiddleWare is Play')

    try{
        const token =req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'FirstToken')
        console.log(decoded)
        const user =await User.findOne({_id:decoded.id,'tokens.token':token})

        if(!user)
        throw new Error()

        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(401).send('Not Authorized')
    }
     
}
module.exports=auth