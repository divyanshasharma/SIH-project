const mongoose=require('mongoose')
require('./connect.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
//        ,
//        validate(value){
//            if(!validator.isEmail(value))
//                throw new Error('Email not correct')
//            }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
    },
    fullAccess:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
                type:String,
                required:true
              }
    }]
})

userSchema.methods.toJSON=function(){
    const obj=this.toObject()
    delete obj.password
    delete obj.tokens

     return obj
}

userSchema.methods.genAuthToken=async function(){
    const token=jwt.sign({id:this._id.toString()},'hackNITJ')
    
    this.tokens=this.tokens.concat({ token })
    await this.save()
    return token
}


userSchema.statics.findByCred=async (email,password)=>{
    
    const user=await User.findOne({email})
    if(!user)
        throw new Error('No such user with this email')
    const match=await bcrypt.compare(password,user.password)
    if(!match)
        throw new Error('Wrong Password')

    return user 

}


userSchema.pre('save',async function(next){

    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,8)
        console.log('Hashing before saving')
    }
    next()
})
        

const User=mongoose.model('User',userSchema)

module.exports=User;