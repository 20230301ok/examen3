patient_id
specialty_id
appointmentDate
reason
status
observations

import {Schema, model } from "mongoose";

const patientsSchema = new Schema ({
    patient_id: {type: String},
    specialty_id: {type: String},
    appointmentDate: {type: Date},
    reason: {type: String},
    status: {type: String},
    observations: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("Patient", patientsSchema)