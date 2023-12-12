
const express= require("express")

require("./dbconfig/dbconfig")

const app = express()

app.use(express.json())

const cryptRouter=require("./routers/routers")

app.get("/api/v1",(req,res)=>{
  res.send("We are learning Bcrypt")
})

app.use("/api/v1", cryptRouter)

const port=2007
app.listen(port, () => {
    console.log(`listening on port:${port}:alive `);
})
