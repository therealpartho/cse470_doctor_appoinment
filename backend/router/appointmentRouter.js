import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, UpdateAppointmentStatus } from "../controller/appointmentController.js";
import{
    isAdminAuthenticated,
    isPatientAuthenticated
} from "../middlewarse/auth.js";
const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, UpdateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;