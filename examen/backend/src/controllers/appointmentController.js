
import appointmentModel from "../models/appointments.js";

const appointmentController = {};

appointmentController={};

appointmentController.getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel
        .find()
        .populate("patient_id")
        .populate("specialty_id");
    
    return res.status(200).json(appointments);
    } catch (error){
        console.log("error"+error);
        return res.status(500).json({
          message: "Internal server error",
        });
    }
};
appointmentController.insertAppointment = async (req, res) => {
    try {
        const {
            patient_id,
specialty_id,
appointmentDate,
reason,
status,
observations,
        } = req.body;
    
    const newAppointment = new appointmentModel({
        patient_id,
specialty_id,
appointmentDate,
reason,
status,
observations,
    });

    await newAppointment.save();
    return res.status(200).json({
message: "appointment saved",
    }) 
    } catch (error) {
        console.log("error"+error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

appointmentController.updateAppointment = async (req, res) => {
    try {
        const {
                  patient_id,
specialty_id,
appointmentDate,
reason,
status,
observations,
        } = req.body;
         const appointmentUpdated = await appointmentModel.findByIdAndUpdate(req.params.id,
                {  patient_id,
specialty_id,
appointmentDate,
reason,
status,
observations,},
            {
                new: true }
    );
    if (!appointmentUpdated){
        return res.status(404).json({
            message: "Not found"
        });
    }
    return res.status(200).json({
        message: "updated"
    })
    } catch (error) {
                console.log("error"+error);
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
};

appointmentController.deleteAppointment= async (req, res) => {
    try {
        const appointmentDeleted = await appointmentModel.findByIdAndDelete(req.params.id
        ); if(! appointmentDeleted){
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        return res.status(200).json({
            message: "Appointment deleted",
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({
            message: "Appointment server error",
        });
    }
};

export default appointmentController;
