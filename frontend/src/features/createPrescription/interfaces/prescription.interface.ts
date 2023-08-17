import { Condition } from "./condition.interface";
import { Medicine } from "./medicine.interface"
import { Patient } from "@/features/prescriptions/interfaces/patient.interface";

export interface Prescription {
    id: string;
    patient: Patient;
    medicines: Medicine[];
    conditions: Condition[];
    note: string;
}