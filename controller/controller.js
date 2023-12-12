
const { escape } = require("querystring");
const Bmodel= require("../model/model");
//bcrypt helps in hashing passwords so we install and then require it
const bcrypt= require("bcrypt")
//require jsonwebtoken

const jsonwebtoken= require("jsonwebtoken")

//instal dotenv and then require it
require("dotenv").config()

exports.signUp= async (req,res)=>{
    try {
        //destructuring aids in data manipulation
        const {userName, email, password, confirmPassword, address, phoneNumber}= req.body;
        if(!userName){
            return res.status(400).json({message:`username cannot be left empty`})
        }
        //now we check if the user is entering same password in confirm password, we can choose to use validator or we can do it this way by using our if and else statement

        if(password!==confirmPassword){
            return res.status(400).json({message:`password does not match`})
        }


        //how to hash our password, first we salt which takes a number in the argument, we use 12 for more security, salting is like the degree of hashing
        const salt= bcrypt.genSaltSync(12); 
        // then we hash, which takes in  2  parameters of what we want to hash(password) and the varable name use in salting

        const hashingpassword= bcrypt.hashSync(password,salt)

        const user= await Bmodel.create({
            //we dont need to map the data, its optional to map, and without mapping, it still recognizes the datas
            userName:userName,
            email:email,
            password:hashingpassword,
            confirmPassword:hashingpassword,
            address:address,
            phoneNumber:phoneNumber
        })
        // await user.save(), can be used without .create, but they can both be used toghether, .save is used when there is to be more manipulation

       //201 is used when we've created a user. it means user created, this is success message(else) 
        res.status(201).json({message:`user has been created successfully`, data:user})

    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

exports.login= async (req,res)=>{
try {
    //user would need email and passwod to login to their existing accounts so we destrcuture and validate user input(validator)
    const{email,password}=req.body;
    //check if the email the user puts is in the database
    const emailExist= await Bmodel.findOne({email});
    if(!emailExist){
        return res.status(404).json({message:`user not found`})
    }
    //check if the password the user puts is in the database
     const checkPassword= bcrypt.compareSync(password, emailExist.password)
     if(!checkPassword){
        return res.status(400).json({message:`incorrect password`})
     }
     //to generate a token, it takes in 3 arguments, the payload(the data you want inside the token, only put the user id and email for security), the secret or private key(this will be hidden in your env) and an objects that takes the expiry date for the token 
       const token= jsonwebtoken.sign(
        {userId:emailExist._id, email:emailExist.email},process.env.SECRET,{expiresIn:"1d"})
       
       res.status(200).json({messsage:`login successful`, token})
} catch (error) {
    res.status(500).json(error.message)
}
}

exports.update=async(req,res)=>{
try {
    const {userId}=req.user;
    const {address,phoneNumber}= req.body;
    //find the user

    const user= await Bmodel.findById(userId)
    if(!user){
        res.status(404).json({message:`User not found`})
    }
    const data={
        address:address || user.address,
        phoneNumber:phoneNumber || user.phoneNumber
    }
    //find and update

    const updatedDate= await Bmodel.findByIdAndUpdate(userId,data,{new:true})

    res.status(200).json({message:`user has been updated `, email:updatedDate.email})
} catch (error) {
    res.send(error.message)
}
}