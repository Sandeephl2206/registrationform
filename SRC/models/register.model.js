const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const userschema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    psw:{
        type: String,
        require: true
    },
    cpsw:{
        type: String,
        require: true
    },
    cpsw1:{    
        type: Number,
        require: true,
        // unique: true
    }
}) 

userschema.methods.generatetoken = async function(){
    try {
        console.log(await this.email);
        const token = jwt.sign({_id:this._id.toString()},"togenerateatokenthisisapublickey");
        console.log(await token)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = new mongoose.model("Users",userschema);