import { createContext, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./components/DataTable"
import { useQuery } from "react-query"
import { fetchPrescriptions } from "@/api/prescription"
import { PrescriptionSummary } from "./interfaces/prescriptionSummary.interface"
import { Filter } from "./interfaces/filter.interface"


//TODO: keeping the filter empty initially. is it a good idea? 
export const filterContext = createContext({filter: {}, set_filter: () => {}});
export interface filterContextType {
    filter: Filter,
    set_filter: Function
}


export const PrescriptionsPage = () => {

    const [ data, set_data ] = useState<PrescriptionSummary[]>([]);
    const [ filter, set_filter ] = useState<Filter>({name: "", phone: "", conditions: [], medicines: [], created_at: undefined});

    const getPrescriptionQuery = useQuery({
        queryKey: ['getPrescriptions', filter], 
        queryFn: () => fetchPrescriptions( filter ),
        select: (data) => {
            // modifies the server response to generate data format compatible to the DataTable
            return data.map( ({id, patient, medicines, conditions, created_at}) => ({
                id,
                name: patient.name,
                phone: patient.phone,
                medicines,
                conditions,
                created_at: (new Date(created_at)),
            }) );
        },
        onSuccess: (data) => set_data(data)
    });

    useEffect( 
        () => {
            console.log(filter)
            getPrescriptionQuery.refetch();
        }
        , [filter]
     )
     

    return (
        // @ts-ignore
        <filterContext.Provider value={{filter, set_filter: set_filter}} >
            <div className="mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </filterContext.Provider>
    )
}
