const express= require("express")
const{ signUp, login, update }=require("../controller/controller")
const authorization = require("../middleware/authentication")

const router=express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.put("/update", authorization,update)




module.exports=router