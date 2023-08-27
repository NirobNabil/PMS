import { Patient } from '@/features/patients/interfaces/patient.interface'
import { Condition } from '@/features/prescription/interfaces/condition.interface';
import { Medicine } from '@/features/prescription/interfaces/medicine.interface';

export interface CreatePrescriptionDto {
    appointment_id: string,
    patient: Patient;
    medicines: Medicine[];
    note: string;
    conditions: Condition[];
}