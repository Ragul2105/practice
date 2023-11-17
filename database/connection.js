const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://demo:demo@cluster0.nuthidp.mongodb.net/?retryWrites=true&w=majorityi",{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(()=>{
    console.log(`mongodb connected`);
}).catch((err)=>{
    console.log(err);
})

const user =  mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const Userdb = mongoose.model("users",user);

module.exports = Userdb;
