import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import equipmentModel from "../models/equipment.js";

import { config } from "../../config.js";
import { v2 as cloudinary} from "cloudinary";
import { register } from "module";


const equipmentController = {};

equipmentController.getAllSpecialty = async (req, res) => {
    try {
        const specialty = await equipmentModel.find();
        return res.status(200).json(specialty);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

equipmentController.insertSpecialty = async (req, res) => {
    try {
        const {specialtyName, description, isAvailable} = req.body;
        const newSpecialty = new equipmentModel({
            specialtyName,
            description,
            isAvailable
    });

    await newSpecialty.save();
    return res.status(200).json({
        message: "Specialty saved"
    });
} catch (error){
    console.log("error" + error);
    return res.status(500).json({
        message: "Internal server error",
    });
}
};

equipmentController.updateSpecialty = async (req, res) => {
    try {
        const {
            specialtyName,
            description,
            isAvailable
        } = req.body;

        const specialtyUpdated= await equipmentModel.findByIdAndUpdate(
            req.params.id, 
            {
            specialtyName,
            description,
            isAvailable
            },
            {new: true}
        );

        if (!specialtyUpdated){
            return res.status(404).json({
                message: "Not found",
            });
        }
        return res.status(200).json({
            message: "Specialty updated"
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

equipmentController.deleteSpecialty = async (req, res) => {
    try {
        const specialtyDeleted = await equipmentModel.findByIdAndDelete (req.params.id);
        if(! specialtyDeleted){
            return res.status(404).json({
                message: "Specialty not found",
            });
        }
        return res.status(200).json({
            message: "Specialty deleted",
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default equipmentController;