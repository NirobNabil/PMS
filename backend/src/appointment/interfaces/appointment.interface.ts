import { Patient } from "../../patient/interfaces/patient.interface"

export interface Appointment {
    id: string;
    patient: Patient;
    note: string;
    datetime: Date
}