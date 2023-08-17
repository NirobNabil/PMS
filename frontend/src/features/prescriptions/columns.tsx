"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Condition } from "@/features/createPrescription/interfaces/condition.interface"
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface"
import { PrescriptionSummary } from "./interfaces/prescriptionSummary.interface"
import { Badge } from "@/components/ui/badge"

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<PrescriptionSummary>[] = [
  {
    accessorKey: "name",
    header: "রোগীর নাম",
  },
  {
    accessorKey: "phone",
    header: "ফোন",
  },
  {
    accessorKey: "conditions",
    header: "রোগ / সমস্যা",
    cell: ({ row }) => {
        const conditions = row.getValue("conditions") as Condition[];

        return (
            <>
                {conditions.map( c => (
                    <Badge key={c.name} className="font-normal" >{c.name}</Badge>
                ) )}
            </>
        )
    },
  },
  {
    accessorKey: "medicines",
    header: "ঔষধ / ড্রপ",
    cell: ({ row }) => {
      const conditions = row.getValue("medicines") as Medicine[];

      return (
          <>
              {conditions.map( c => (
                  <Badge key={c.name} className="font-normal" variant={"outline"} >{c.name}</Badge>
              ) )}
          </>
      )
  },
  },
]