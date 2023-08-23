import { Medicine } from "../interfaces/medicine.interface"
import { Patient } from "../../patient/interfaces/patient.interface"
import { Condition } from "../interfaces/condition.interface";

export class CreatePrescriptionDto {
    patient: Patient;
    medicines: Medicine[];
    note: string;
    conditions: Condition[];
}
  