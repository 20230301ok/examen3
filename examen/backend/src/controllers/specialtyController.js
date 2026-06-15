import specialtyModel from "../models/specialty.js";

const specialtyController = {};

specialtyController.getAllSpecialty = async (req, res) => {
    try {
        const specialty = await specialtyModel.find();
        return res.status(200).json(specialty);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

specialtyController.insertSpecialty = async (req, res) => {
    try {
        const {specialtyName, description, isAvailable} = req.body;
        const newSpecialty = new specialtyModel([
            new
        ])
    }
} 