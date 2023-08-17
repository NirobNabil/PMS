import { Condition } from "@/features/prescription/interfaces/condition.interface"
import { Medicine } from "@/features/prescription/interfaces/medicine.interface"

export interface PrescriptionSummary {
    id: string
    name: string
    phone: string
    conditions: Condition[]
    medicines: Medicine[]
}