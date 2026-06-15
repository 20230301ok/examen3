import {Schema, model } from "mongoose";

const patientsSchema = new Schema ({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    birthdate: {type: Date},
    phone: {type: String},
    address: {type: String},
    phoneEmergencyContacts: [{
        phone: {type: String},
        nameEmergencyContact: {type: String},
    }],
    profilePhoto: {type: String},
    public_id: {type: String},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Date},   
},{
    timestamps: true,
    strict: false
})

export default model("Patient", patientsSchema)