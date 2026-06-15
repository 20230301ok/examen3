import express from "express";
//import cors from cors;
import patientRoutes from "./src/routes/patients.js";
import loginPatientsRoutes from "./src/routes/loginPatients.js"
import patientRegisterRoutes from "./src/routes/registerPatients.js";
import specialtyRoutes from "./src/routes/specialty.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/patientsRegister", patientRegisterRoutes);
app.use("/api/specialty", specialtyRoutes);
app.use("/api/login", loginPatientsRoutes);
export default app;
