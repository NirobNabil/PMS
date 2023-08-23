import { Condition } from "@/features/createPrescription/interfaces/condition.interface";
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface";

export interface Filter {
    name: string,
    phone: string,
    conditions: Condition[],
    medicines: Medicine[]
}