

import {Schema, model } from "mongoose";

const specialtySchema = new Schema ({
    specialtyName: {type: String},
    description: {type: String},
    isAvailable: {type: Boolean},
},{
    timestamps: true,
    strict: false
})

export default model("Specialty", specialtySchema)