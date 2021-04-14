require('dotenv').config({path:"./config.env"})
const express=require("express")
const connectDB = require("./config/db")
const errorHandler=require("./middleware/error")
connectDB();
const app=express();
app.use(errorHandler);
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
const Port = process.env.Port || 5000;
const server = app.listen(Port,()=>{
    console.log(`app is running ${Port}`)
})
process.on("unhandledRejection",(err,promise)=>{
    console.log(`logged  here${err}`);
    server.close(()=> process.exit(1));
});