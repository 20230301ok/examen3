
import {Schema, model } from "mongoose";

const equipmentSchema = new Schema ({
    equipmentName: {type: String},
    description: {type: String},
    brand: {type: Date},
    model: {type: String},
    purchaseDate: {type: Date},
    maintenanceDate: {type: Date},
    condition: {type: String},
    image: {type: String},
    public_id: {type: String},
    isAvailable: {type: Boolean},
},{
    timestamps: true,
    strict: false
})

export default model("Equipment", equipmentSchema)