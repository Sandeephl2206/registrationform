const express = require("express");
const path = require("path");
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const connectdb = require("../SRC/db/dconn")
const app = express();
const Users = require("./models/register.model");
connectdb();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set('view engine','hbs');


app.get("/",(req,res)=>{
    res.render("index")
})


app.get("/register",(req,res)=>{
    res.render("register");
})  


app.post("/register",async(req,res)=>{
    try{
        const password = req.body.psw;
        const cpassword = req.body.cpsw;
        const securepassword = await bcrypt.hash(password,10);
        const securepassword1 = await bcrypt.hash(cpassword,10);
        console.log(await bcrypt.compare(cpassword,securepassword1));
        if(password === cpassword){
            const registeremp = {
                email:req.body.email,
                psw:securepassword,
                cpsw:securepassword1,
                cpsw1:req.body.cpsw1,
          }
          console.log("registeremp" ,registeremp);

          const token = registeremp.generatetoken();
          await Users.insertMany([registeremp]) 
          console.log(registeremp.password)
          res.status(200).send("done");   
          console.log(securepassword)
        }else{
            res.send("password not matching");
        }
    }catch(err){
        res.status(404).send(err)
    }
})  


app.post("/index",async(req,res)=>{
    try{
        const check = await Users.findOne({ email: req.body.email });
        console.log(check);
        console.log(req.body.email)
        console.log(req.body.psw)
        console.log(check.psw)
        const comparepass = await bcrypt.compare(req.body.psw,check.psw);
        if(comparepass){
            res.send("home")
        }else{
            res.json("siginin first")
        }
    }catch(err){    
        res.status(404).json(err)   
    }
})  
app.listen(3000,()=>{
    console.log("conecction is done")
})



