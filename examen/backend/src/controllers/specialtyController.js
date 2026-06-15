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
        const newSpecialty = new specialtyModel({
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

specialtyController.updateSpecialty = async (req, res) => {
    try {
        const {
            specialtyName,
            description,
            isAvailable
        } = req.body;

        const specialtyUpdated= await specialtyModel.findByIdAndUpdate(
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

specialtyController.deleteSpecialty = async (req, res) => {
    try {
        const specialtyDeleted = await specialtyModel.findByIdAndDelete (req.params.id);
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

export default specialtyController;