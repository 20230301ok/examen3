import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import patientsModel from "../models/patients.js";

import { config } from "../../config.js";
import { v2 as cloudinary} from "cloudinary";
import { register } from "module";

const registerPatientController = {};

registerPatientController.register = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
         password,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    isVerified,
    loginAttempts,
    timeOut,
    } = req.body;
 const existsPatient = await patientsModel.findOne({email});
 if (existsPatient){
    return res.status(400).json({message: "Patient already exists"});
 }
 const passwordHashed = await bcryptjs.hash(password, 10);
  const profilePhoto = req.file?.path || "";
 const public_id = req.file?.filename || "";
 const randomCode = crypto.randomBytes(3).toString("hex");
 
 const token = jsonwebtoken.sign(
    {
        randomCode,
        name,
            lastName,
            email,
         password: passwordHashed,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    profilePhoto,
    public_id,
    isVerified,
    loginAttempts,
    timeOut,
    },
    config.JWT.secret,
    {expiresIn: "15m"},
 );
 res.cookie("registrationCookie", token, {maxAge:15*60*1000});
 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
    },
 });
 const mailOptions ={
    from: config.email.user_email,
    to: email,
    subject: "Verificacion de cuenta",
    text: "Para verificar tu cuenta ocupa esta codigo " + randomCode + " expira en 15 minutos",
 };
 transporter.sendMail(mailOptions, (error, info) => {
    if (error){
        console.log("error"+error);
        return res.status(500).json({message: "Error sending email"});
    }
    return res.status(200).json({message: "email sent"});
 });
}catch (error){
    console.log("error"+error);
    return res.status(500).json({message: "Internal server error"});
}
};

registerPatientController.verifyCode = async (req, res)=> {
    try {
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.registrationCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
        randomCode: storedCode,
        name,
            lastName,
            email,
         password,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    profilePhoto,
    public_id,
    isVerified,
    loginAttempts,
    timeOut,
    } = decoded;
    if (verificationCodeRequest != storedCode){
        return res.status(400).json({message: "Invalid code"});
    }
    const newPatient = patientsModel({
        name,
            lastName,
            email,
         password,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    profilePhoto,
    public_id,
    isVerified: true,
    });
    await newPatient.save();
    res.clearCookie("registrationCookie");

    return res.status(200).json({message: "Patient registered"});
    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};
export default registerPatientController;