import { useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./components/DataTable"
import { useQuery } from "react-query"
import { fetchPrescriptions } from "@/api/prescription"
import { Prescription } from "@/features/createPrescription/interfaces/prescription.interface"
import { PrescriptionSummary } from "./interfaces/prescriptionSummary.interface"


export const PrescriptionsPage = () => {

    const [ data, set_data ] = useState<PrescriptionSummary[]>([]);

    const getPrescriptionQuery = useQuery('getPrescriptions', fetchPrescriptions);

    useEffect(
        () => {
            if( getPrescriptionQuery.status == 'success' ) {
                const data = getPrescriptionQuery.data as Prescription[];
                const processed_data = data.map( ({id, patient, medicines, conditions}) => ({
                    id,
                    name: patient.name,
                    phone: patient.phone,
                    medicines,
                    conditions,
                }) );
                set_data( processed_data )
            }
        }, [getPrescriptionQuery.data]
    )

    return (
        <div className="mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
