

import {Schema, model } from "mongoose";

const patientsSchema = new Schema ({
    patient_id: {type: mongoose.Types.ObjectId,
        ref: "Patient"
    },
    specialty_id: {type: mongoose.Types.ObjectId,
        ref: "Specialty"},
    appointmentDate: {type: Date},
    reason: {type: String},
    status: {type: String},
    observations: {type: String},
},{
    timestamps: true,
    strict: false
})

export default model("Patient", patientsSchema)