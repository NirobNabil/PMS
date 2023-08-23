import { Medicine } from "./medicine.interface"
import { Patient } from "../../patient/interfaces/patient.interface"
import { Condition } from "./condition.interface";

export interface Prescription {
    id: string;
    patient: Patient;
    medicines: Medicine[];
    note: string;
    conditions: Condition[];
    created_at: Date
}