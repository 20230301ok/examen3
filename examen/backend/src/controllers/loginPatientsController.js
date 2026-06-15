import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config}  from "../../config.js";
import patientsModel from "../models/patients.js";

const loginPatientController = {};

loginPatientController.login=async (req, res) => {
    try {
        const {email, password} = req.body;
        const patientFound = await patientsModel.findOne({email})

        if (!patientFound){
            return res.status(400).json({message: "Patient not found"})
        }
        if (!patientFound.timeOut && patientFound.timeOut > Date.now())
        {
            return res.status(403).json({message: "Blocked account"});
        }
        const isMatch = await bcrypt.compare(password, patientFound.password);
        if (!isMatch){
            patientFound.loginAttemps = (patientFound.loginAttemps || 0) + 1;
        
            if (patientFound.loginAttemps >= 5){
                patientFound.timeOut = Date.now()+5*60*1000;
                patientFound.loginAttemps= 0;

                await patientFound.save();
                return res
                .status(403)
                .json({message: "Blocked account for too many attemps"})
            }
            await patientFound.save();
            return res.status(401).json({message: "Wrong password"});
        }
        patientFound.loginAttemps = 0;
        patientFound.timeOut = null;
        const token = jsonwebtoken.sign(
            {id: patientFound._id, userType: "patient"},
            config.JWT.secret, {
                expiresIn: "30d"
            },

            res.cookie("authCookie", token, {maxAge: 30*24*60*60*1000}));

            return res.status(200).json({message: "Login succesfully"});
        } catch (error){
            console.log ("error"+error);
            return res.status(500).json({message: "Internal server error"});
        }
    };
export default loginPatientController;