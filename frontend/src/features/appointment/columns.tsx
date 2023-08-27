"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface"
import { Separator } from "@radix-ui/react-separator"
import { InputFilter } from "./components/input.filter"
import { format } from "date-fns"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Medicine>[] = [
    {
        accessorKey: "name",
        header: "Patient name",
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("name")}
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Patient phone",
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("phone")}
                </div>
            )
        }
    },
    {
        accessorKey: "datetime",
        header: "Date & Time",
        cell: ({row}) => {
            console.log("row ", row.getValue("datetime"));
            return (
                <div className="flex flex-col r" >
                    {format( row.getValue("datetime"), "LLL dd, y : hh:mm aa")}
                </div>
            )
        }
    },
    {
        accessorKey: "prescription_id",
        header: "Prescription",
        cell: ({row}) => {
            console.log("row ", row.getValue("prescription_id"));
            return (
                <div className="flex flex-col r" >
                    {row.getValue("prescription_id")}
                </div>
            )
        }
    }
    
]