import { Medicine } from "../interfaces/medicine.interface"
import { Patient } from "../../patient/interfaces/patient.interface"
import { Condition } from "../interfaces/condition.interface";

export class CreateAppointmentDto {
    patient: Patient;
    note: string;
    datetime: Date
}
  