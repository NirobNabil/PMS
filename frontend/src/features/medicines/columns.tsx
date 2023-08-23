"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface"
import { Separator } from "@radix-ui/react-separator"
import { InputFilter } from "./components/input.filter"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Medicine>[] = [
    {
        accessorKey: "name",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>Name</span>
                    <Separator orientation="horizontal" className="w-28 h-[1px] bg-slate-400" />
                    <InputFilter name="name" className="h-auto py-1 w-40" />
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("name")}
                </div>
            )
        }
    },
    {
        accessorKey: "generic_name",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>Generic Name</span>
                    <Separator orientation="horizontal" className="w-16 h-[1px] bg-slate-400" />
                    <InputFilter name="generic_name" className="h-auto py-1 w-40" />
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("generic_name")}
                </div>
            )
        }
    },
    {
        accessorKey: "producer",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>Producer</span>
                    <Separator orientation="horizontal" className="w-16 h-[1px] bg-slate-400" />
                    <InputFilter name="producer" className="h-auto py-1 w-40" />
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("producer")}
                </div>
            )
        }
    }
    
]