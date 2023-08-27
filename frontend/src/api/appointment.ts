import { Filter } from "@/features/medicines/interfaces/filter.interface";
import { api } from ".";
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface";
import { CreateMedicineDto } from "@/features/createPrescription/dto/create-medicine.dto";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { Appointment } from "@/features/appointment/interfaces/appointment.interface";


export const createAppointment = async (appointment : CreateAppointmentDto) : Promise<Appointment> => {
    return ( await api.post( 'appointment', appointment ) ).data;
}

export const fetchAppointments = async (filter : Filter) : Promise<Appointment[]> => {
    return ( await api.get( 'appointment', { params: filter } ) ).data;
}