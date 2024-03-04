const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'user'
    }
},
    { timestamps : true } 
);
module.exports = model("users", userSchema);
