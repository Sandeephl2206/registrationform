const mongoose = require("mongoose");
const connectdb = async() =>{
    try{
        const connect = mongoose.connect("mongodb+srv://sandy:sandy@usersignin.qm7ehfh.mongodb.net/usersignin?retryWrites=true&w=majority");
        console.log("connection established",(await connect).connection.name,(await connect).connection.host);
    }
    catch(err){
        console.log(err)
    }
}
module.exports = connectdb;
