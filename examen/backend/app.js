import express from "express";
//import patientRoutes from "./src/routes/patients.js";
import patientRegisterRoutes from "./src/routes/registerPatients.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true
    }),
);
app.use(cookieParser());
app.use(express.json());
//app.use("/api/patients", patientRoutes);
app.use("/api/patientsRegister", patientRegisterRoutes);
export default app;
