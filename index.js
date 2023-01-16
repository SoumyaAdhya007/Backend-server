const express= require("express");
require('dotenv').config();
const {PostRouter}=require("./Routers/post.router")
const {connect}=require("./config/db.js");
const {UserRouter}=require("./Routers/users.router")
const {authentication}=require("./Middleware/auth.middlware")
const cors = require('cors')
const app= express();
app.use(cors())
app.use(express.json());
app.use("/users",UserRouter)
app.use(authentication)
app.use("/posts",PostRouter)
app.listen(process.env.port,async ()=>{
    try {
        await connect;
        console.log("Connect to Db");
        console.log(`Server running in${process.env.port}`)
    } catch (error) {
        
    }
})

