const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('./database/connection');

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}))

const Userdb = require('./database/connection');


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/registration",(req,res)=>{
    res.sendFile(__dirname+"/registration.html");
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.post("/registration",async (req,res)=>{
    try {
        
        const newuser = new Userdb({
            user:req.body.name,
            password:req.body.password
        })

        newuser
            .save(newuser)
            .then((data)=>{
                res.status(200).sendFile(__dirname+"/index.html");
            })
            .catch((err)=>{
                res.send(err);
            })
        

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req,res)=>{
    try {
        
        const username = req.body.user;
        const password = req.body.password;
        console.log(username+" "+password);

        const User = await Userdb.findOne({user:username});
        console.log(User);
        if (User.password === password){

            res.status(201).send("success da goiya");

        }else{
            res.send("invalid login details");
        }


    } catch (err) {
        res.status(400).send("invalid login details")
    }
})

app.listen(4000,()=>{
    console.log(`server is listening in port 4000`);
})