const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,lowecase:true,trim:true,unique:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:String,default:'inactive'},
    urlCreated: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Url' } 
    ],
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date }   
})
const Users=mongoose.model("Users",userSchema)
module.exports=Users

