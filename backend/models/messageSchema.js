import mongoose from "mongoose";

import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"first name must contain at least 3 character!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last name must contain at least 3 character!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [11,"phone number must contain exact 11 digit"],
        maxLength: [11,"phone number must contain exact 11 digit"],
    },
    message:{
        type: String,
        required: true,
        minLength: [10,"message must contain At Least 10 Character"],
        
    },
});

export const Message = mongoose.model("Message",messageSchema);