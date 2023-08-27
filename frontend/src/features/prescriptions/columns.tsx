"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Condition } from "@/features/createPrescription/interfaces/condition.interface"
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface"
import { PrescriptionSummary } from "./interfaces/prescriptionSummary.interface"
import { Badge } from "@/components/ui/badge"
import { ConditionFilter } from "./components/conditions.filter"
import { Separator } from "@radix-ui/react-separator"
import { MedicineFilter } from "./components/medicines.filter"
import { Input } from "@/components/ui/input"
import { InputFilter } from "./components/input.filter"
import { DateRangeFilter } from "./components/date.filter"
import { format } from 'date-fns';
import { GanttChartSquare } from "lucide-react";
import { Link } from 'react-router-dom';


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PrescriptionSummary>[] = [
    {
        accessorKey: "name",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>রোগীর নাম</span>
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
        accessorKey: "phone",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>ফোন</span>
                    <Separator orientation="horizontal" className="w-16 h-[1px] bg-slate-400" />
                    <InputFilter name="phone" className="h-auto py-1 w-40" />
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {row.getValue("phone")}
                </div>
            )
        }
    },
    {
        accessorKey: "conditions",
        header: ({ table }) => {
            return (
                <div className="flex flex-col gap-y-2 py-4 w-48" >
                    <span>রোগ / সমস্যা</span>
                    <Separator orientation="horizontal" className="w-28 h-[1px] bg-slate-400" />
                    <ConditionFilter  />
                </div>
            )
        },
        cell: ({ row }) => {
            const conditions = row.getValue("conditions") as Condition[];

            return (
                <div className="flex flex-row flex-wrap gap-y-2 gap-x-2 r">
                    {conditions.map(c => (
                        <Badge variant={'secondary'} key={c.name} className="font-normal" >{c.name}</Badge>
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: "medicines",
        header: ({ table }) => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r w-56" >
                    <span>ঔষধ / ড্রপ</span>
                    <Separator orientation="horizontal" className="w-28 h-[1px] bg-slate-400" />
                    <MedicineFilter />
                </div>
            )
        },
        cell: ({ row }) => {
            const conditions = row.getValue("medicines") as Medicine[];

            return (
                <div className=" flex flex-row gap-y-2 gap-x-2">
                    {conditions.map(c => (
                        <Badge key={c.name} className="font-normal" variant={"outline"} >{c.name}</Badge>
                    ))}
                </div>
            )
        },
    }, 
    {
        accessorKey: "created_at",
        header: () => {
            return (
                <div className="flex flex-col gap-y-2 py-4 r" >
                    <span>Created at</span>
                    <Separator orientation="horizontal" className="w-16 h-[1px] bg-slate-400" />
                    <DateRangeFilter name="created_at" />
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex flex-col r" >
                    {format(row.getValue("created_at"), "LLL dd, y")}
                </div>
            )
        }
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({row}) => {
            console.log("gg", row.getValue('id'));
            return (
                <div className="flex flex-col r" >
                    <Link to={"/prescription/"+row.getValue('id')} >
                        <GanttChartSquare />
                    </Link>
                </div>
            )
        }
    },
]