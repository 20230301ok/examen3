import express from "express";
//import cors from cors;
import patientRoutes from "./src/routes/patients.js";
import patientRegisterRoutes from "./src/routes/registerPatients.js";
import specialtyRoutes from "./src/routes/specialty.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/patientsRegister", patientRegisterRoutes);
app.use("/api/specialty", specialtyRoutes);
export default app;
