import { Filter } from "@/features/medicines/interfaces/filter.interface";
import { api } from ".";
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface";
import { CreateMedicineDto } from "@/features/createPrescription/dto/create-medicine.dto";


export const createMedicine = async (medicine : CreateMedicineDto) : Promise<Medicine> => {
    return ( await api.post( 'medicine', medicine ) ).data;
}

export const fetchMedicines = async (filter : Filter) : Promise<Medicine[]> => {
    return ( await api.get( 'medicine', { params: filter } ) ).data;
}