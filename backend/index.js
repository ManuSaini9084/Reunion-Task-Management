const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.routes");
const { taskRoute } = require("./routes/tasks.routes");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express());
app.use(express.json())
app.use("/users",userRoute)
app.use("/tasks",taskRoute)


app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Mongodb atlas is connected ")
        console.log("Server is Conntected")
    }catch(err){
        console.log(err)
    }
})