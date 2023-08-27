import { Patient } from "../../patient/interfaces/patient.interface"

export class CreateAppointmentDto {
    patient: Patient;
    note: string;
    datetime: Date
}
  