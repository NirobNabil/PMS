import { Medicine } from "../interfaces/medicine.interface"
import { Patient } from "@/features/prescriptions/interfaces/patient.interface"
import { Condition } from "../interfaces/condition.interface";

export interface CreatePrescriptionDto {
    patient: Patient;
    medicines: Medicine[];
    note: string;
    conditions: Condition[];
}
  