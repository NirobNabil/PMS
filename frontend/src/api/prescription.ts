import { Medicine } from '@/features/createPrescription/interfaces/medicine.interface';
import { CreatePrescriptionDto } from './dto/prescription.dto';
import { api } from './index'
import { Prescription } from '@/features/createPrescription/interfaces/prescription.interface';
import { Condition } from '@/features/createPrescription/interfaces/condition.interface';
import { createConditionDto } from '@/features/createPrescription/dto/create-condition.dto';
import { Filter } from '@/features/prescriptions/interfaces/filter.interface';

export const createPrescription = async (data : CreatePrescriptionDto) : Promise<Prescription> => {
    return ( await api.post('/prescription', data) ).data;
}

export const fetchPrescriptions = async (filter : Filter ) : Promise<Prescription[]> => {
    return ( await api.get('/prescription', { params: filter } ) ).data;
}

// TODO: this function should probably be moved to api/medicines
export const fetchAllMedicines = async () : Promise<Medicine[]> => {
    const data = ( await api.get('prescription/medicine') ).data;
    return data;
}

export const fetchAllConditions = async () : Promise<Condition[]> => {
    const data = ( await api.get('prescription/condition') ).data;
    return data;
}

export const createCondition = async ( data : createConditionDto ) : Promise<Condition> => {
    return ( await api.post('prescription/condition', data) ).data;
}