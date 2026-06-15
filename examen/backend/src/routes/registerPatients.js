import express from "express";
import registerPatientController from "../controllers/registerPatientsController.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.route("/")
.post(upload.single("profilePhoto"), registerPatientController.register);

router.route("/verifyCodeEmail")
.post (registerPatientController.verifyCode)
export default router;
