const mongoose= require("mongoose")

const bSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
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
    confirmPassword:{
        type:String,
        required:true
    },
    address:{
        type:String
        
    },
    phoneNumber:{
        type:String
        
    },

     
},{timestamps:true})

const Bmodel= mongoose.model("Users", bSchema)

module.exports=Bmodel