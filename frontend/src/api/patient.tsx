import { api } from './index'
import { Patient } from '@/features/patients/interfaces/patient.interface'
import { CreatePatientDto } from '@/features/patients/dto/create-patient.dto';

export const getAllPatients = async () : Promise<Patient[]> => {
    const data = ( await api.get('patient') ).data;
    return data;
}

export const findPatientByPhone = async (phone : string) : Promise<Patient | null> => {
    const data = ( await api.get('patient?phone=' + phone) ).data;
    if( data == "" ) return null;
    return data;
}

export const findPatientsByName = async (name : string) : Promise<Patient> => {
    const data = (await api.get('patient?name=' + name)).data;
    return data;
}

export const createPatient = async ( patient : CreatePatientDto ) : Promise<Patient> => {
    const data = ( await api.post( 'patient', patient ) ).data;
    return data;
}
