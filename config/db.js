const mongoose=require("mongoose")
const connectDB = async() => {
    await mongoose.connect("mongodb+srv://mern_auth:l5VN15YItofge0eI@cluster0.99h5c.mongodb.net/mern_auth?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    console.log("mongodb connected");
}
module.exports = connectDB;