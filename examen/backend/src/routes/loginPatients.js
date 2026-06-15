import express from "express";
import loginPatientController from "../controllers/loginPatientsController.js";

const router = express.Router();

router.route("/")
.post(loginPatientController.login);


export default router;
