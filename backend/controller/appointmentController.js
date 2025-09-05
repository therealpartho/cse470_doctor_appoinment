import { catchAsyncErrors } from "../middlewarse/catchAsyncErrors.js";
import ErrorHandler from  "../middlewarse/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if( 
       !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    )   {
        return next (new ErrorHandler("Please Fill Full Form!", 400));

    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });
    if (isConflict.length===0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }
    if (isConflict.length>1) {
        return next(
            new ErrorHandler(
                "Doctor Conflict! Please Contact Through Email or Phone!", 
                404
            )
        );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Sent successfully!",
        appointment,
    });
});

export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

export const UpdateAppointmentStatus = catchAsyncErrors(
  async(req,res,next)=>{
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });
    res.status(200).json({
        success: true,
        message: "Appointment Status updated! ",
        appointment,
    });
  }
);

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment Deleted!",
    });
});

// New function for CFG analysis with nested loops and branches
export const checkSlotAvailability = catchAsyncErrors(async (req, res, next) => {
    const { doctorId, date } = req.body;
    
    if (!doctorId || !date) {
        return next(new ErrorHandler("Doctor ID and date are required", 400));
    }

    // Get doctor's information
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "Doctor") {
        return next(new ErrorHandler("Doctor not found", 404));
    }

    // Get existing appointments for this doctor on the selected date
    const existingAppointments = await Appointment.find({
        doctorId,
        appointment_date: { $gte: new Date(date + "T00:00:00"), $lte: new Date(date + "T23:59:59") },
        status: { $in: ["scheduled", "confirmed"] }
    });

    // Define working hours (9 AM to 5 PM)
    const startHour = 9;
    const endHour = 17;
    const availableSlots = [];
    
    // Nested loop: Days of week (outer) and hours (inner)
    for (let day = 0; day < 7; day++) {
        const daySlots = [];
        
        for (let hour = startHour; hour < endHour; hour++) {
            const timeSlot = `${hour}:00`;
            let isAvailable = true;
            let reason = "";
            
            // FIRST BRANCH: Check if doctor works on this day
            if (day === 0 || day === 6) { // Sunday (0) or Saturday (6)
                isAvailable = false;
                reason = "Weekend";
            }
            
            // SECOND BRANCH: Check if slot is already booked
            const isBooked = existingAppointments.some(app => {
                const appHour = new Date(app.appointment_date).getHours();
                return appHour === hour;
            });
            
            if (isBooked) {
                isAvailable = false;
                reason = "Already booked";
            }
            
            // THIRD BRANCH: Check if it's lunch time (12 PM to 1 PM)
            if (hour === 12) {
                isAvailable = false;
                reason = "Lunch break";
            }
            
            daySlots.push({
                time: timeSlot,
                available: isAvailable,
                reason: reason
            });
        }
        
        availableSlots.push({
            day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
            slots: daySlots
        });
    }

    res.status(200).json({
        success: true,
        message: "Slot availability checked",
        data: availableSlots
    });
});