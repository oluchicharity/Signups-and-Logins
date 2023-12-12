const JsonWebToken = require("jsonwebtoken");
const Bmodel = require("../model/model");

const authorization= async (req,res,next)=>{
    try {
        //get the users token from the request header
        const hasAuthorization= req.headers.authorization;

        //check if the user has a token
      if(!hasAuthorization){
        return res.status(400).json({message:`User not authorized`})
      }     
      //seperate the token from the bearer using split method because the bearer comes with the token, we are passing 1 because in javascript we count from 0 to 1, the token is the second item so we put 1 in the array
      const token= hasAuthorization.split(" ")[1]

      //check if the token returns empty(just incase it happens)
      if(!token){
        return res.status(401).json({message:`invalid token`})
      }

      //since the token is unreadable, we will have to decode it, it takes in 2 parameters, token and secret
        const decodeToken= JsonWebToken.verify(token, process.env.SECRET);

     const user= await Bmodel.findById(decodeToken.userId)

     if(!user){
        res.status(404).json({message:`authentication failed,user does not exist`})
     }
     //our else statement, we are passing everything in the decodeToken to the request(req)
     req.user=decodeToken
 next()
    } catch (error) {
        res.send(error.message)
    }
}
module.exports=authorization