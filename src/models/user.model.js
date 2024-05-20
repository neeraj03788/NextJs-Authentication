import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false

    }
    ,
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordVerify:String,
    forgotPasswordExpiery:Date,
    VerifyToken:String,
    VerifyTokenExpiery:Date

})

export const User=mongoose.model.users|| mongoose.model("users",userSchema)