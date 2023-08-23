import { createContext, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./components/DataTable"
import { useQuery } from "react-query"
import { fetchPrescriptions } from "@/api/prescription"
import { Filter } from "./interfaces/filter.interface"
import { Medicine } from "../createPrescription/interfaces/medicine.interface"
import { fetchMedicines } from "@/api/medicine"
import { CreateMedicine } from "./components/createMedicine"


//TODO: keeping the filter empty initially. is it a good idea? 
export const filterContext = createContext({filter: {}});


export const MedicinesPage = () => {

    const [ data, set_data ] = useState<Medicine[]>([]);
    const [ filter, set_filter ] = useState<Filter>({name: "", generic_name: "", producer: ""});

    const getMedicinesQuery = useQuery({
        queryKey: ['getMedicines', filter], 
        queryFn: () => fetchMedicines( filter ),
        onSuccess: (data) => set_data(data)
    });

    useEffect( 
        () => {
            console.log(filter)
            getMedicinesQuery.refetch();
        }
        , [filter]
     )

    // useEffect(
    //     () => {
    //         if( getPrescriptionQuery.status == 'success' ) {
    //             const data = getPrescriptionQuery.data as Prescription[];
    //             const processed_data = data.map( ({id, patient, medicines, conditions}) => ({
    //                 id,
    //                 name: patient.name,
    //                 phone: patient.phone,
    //                 medicines,
    //                 conditions,
    //             }) );
    //             set_data( processed_data )
    //         }
    //     }, [getPrescriptionQuery.isLoading]
    // )

    return (
        // @ts-ignore
        <filterContext.Provider value={{filter, set_filter: set_filter}} >
            <div className="pt-16" >
                <CreateMedicine />
                <div className="mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </filterContext.Provider>
    )

    // return (<div>asdasd</div>)
}
