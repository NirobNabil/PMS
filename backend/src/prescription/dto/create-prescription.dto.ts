import { Medicine } from "../interfaces/medicine.interface"
import { Patient } from "../../patient/interfaces/patient.interface"
import { Condition } from "../interfaces/condition.interface";
import { Appointment } from "src/appointment/interfaces/appointment.interface";

export class CreatePrescriptionDto {
    appointment_id: string;
    patient: Patient;
    medicines: Medicine[];
    note: string;
    conditions: Condition[];
}
  