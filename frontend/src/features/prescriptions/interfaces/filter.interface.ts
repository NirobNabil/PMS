import { Condition } from "@/features/createPrescription/interfaces/condition.interface";
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface";
import { DateRange } from "react-day-picker";

export interface Filter {
    name: string,
    phone: string,
    conditions: Condition[],
    medicines: Medicine[],
    created_at: DateRange | undefined
}