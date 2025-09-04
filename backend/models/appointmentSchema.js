import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic:{
        type: String,
        required: true,
        minLength: [13,"nic must contain exact 13 digit"],
        maxLength: [13,"nic must contain exact 13 digit"],
    },
    dob: {
        type: Date,
        required:[true,"DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male","Female"],
    },
    appointment_date:{
        type:String,
        required: true,
    },
    department:{
        type:String,
        required: true,
    },
    doctor:{
        firstName:{
            type:String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited:{
        type: Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Pending","Accepted","Rejected"],
        default: "Pending",
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
