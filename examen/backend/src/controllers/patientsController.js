import patientsModel from "../models/patients.js";
const patientController = {};

patientController.getPatients = async (req, res) => {
    try {
        const patients = await patientModel.find();
        return res.status(200).json(patients);
    } catch (error){
        console.log("error"+error);
        return res.status(500).json({message: "internal server error"});
    }
};

patientController.updatePatient=async (req, res) => { 
      try {
        let {
            name,
            lastName,
            email,
         password,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    isVerified
    } = req.body;
        name = name?.trim();
        email = email?.trim();
    
        if (!name || !email || !password){
            return res.status(400).json({message: "Fields required"});
        }
        if (name.length < 3 || name.length > 15) {
            return res.status(400).json({message: "Please insert a valid name"});
        }

        const patientUpdated = await patientsModel.findByIdAndUpdate(req.params.id);
        { name,
            lastName,
            email,
         password,
    birthDate,
    phone,
    address,
    phoneEmergencyContact,
    profilePhoto,
    public_id,
    isVerified}
    {new true}
    
    if (!patientUpdated){
        return res.status(404).json({message: "Patient not found"});
    }
    return res.status(200).json({message: "Patient updated"});
} catch (error) {
console.log("error"+error);
return res.status(500).json({message: "Internal server error"});
}
};

patientController.deletePatient = async(req, res) => {
    try {
        const deletedPatient = patientsModel.findByIdAndDelete(req.params.id);

        if(!deletedPatient){
            return res.status(404).json({message: "Patient not found"});
        }
        return res.status(200).json({message: "Patient deleted"});
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default patientController;
