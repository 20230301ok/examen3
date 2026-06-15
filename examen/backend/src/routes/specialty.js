
import express from "express";
import specialtyController from "../controllers/specialtyController.js";

const router = express.Router();

router.route("/")
.get(specialtyController.getAllSpecialty)
.post(specialtyController.insertSpecialty);

router.route("/:id")
.put(specialtyController.updateSpecialty)
.delete(specialtyController.deleteSpecialty)

export default router