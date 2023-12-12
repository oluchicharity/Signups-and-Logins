const mongoose= require("mongoose")
const dbhost= "localhost:27017"
const dbname= "Learning_bcrypt"


mongoose.connect(`mongodb://${dbhost}/${dbname}`).then(()=>{
    console.log(`connected to mongoDB successfully`)
}).catch((error)=>{
  console.log("cannot connect to mongodb",+error.message)
})