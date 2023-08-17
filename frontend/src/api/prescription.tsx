import { Medicine } from '@/features/prescription/interfaces/medicine.interface';
import { CreatePrescriptionDto } from './prescription.dto';
import { api } from './index'
import { Prescription } from '@/features/prescription/interfaces/prescription.interface';
import { Condition } from '@/features/prescription/interfaces/condition.interface';

export const createPrescription = async (data : CreatePrescriptionDto) : Promise<Prescription> => {
    return ( await api.post('/prescription', data) ).data;
}

export const fetchPrescriptions = async () : Promise<Prescription[]> => {
    return ( await api.get('/prescription') ).data;
}

export const fetchAllMedicines = async () : Promise<Medicine[]> => {
    const data = ( await api.get('prescription/medicine') ).data;
    return data;
}

export const fetchAllConditions = async () : Promise<Condition[]> => {
    const data = ( await api.get('prescription/condition') ).data;
    return data;
}