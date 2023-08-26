import { createContext, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./components/DataTable"
import { useQuery } from "react-query"
import { Medicine } from "../createPrescription/interfaces/medicine.interface"
import { CreateAppointment } from "./components/createAppointment"


//TODO: keeping the filter empty initially. is it a good idea? 
export const filterContext = createContext({filter: {}});


export const AppointmentPage = () => {

    const [ data, set_data ] = useState<Medicine[]>([]);

    // const getMedicinesQuery = useQuery({
    //     queryKey: ['getMedicines', filter], 
    //     queryFn: () => fetchMedicines( filter ),
    //     onSuccess: (data) => set_data(data)
    // });

    // useEffect( 
    //     () => {
    //         console.log(filter)
    //         getMedicinesQuery.refetch();
    //     }
    //     , [filter]
    //  )

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
        <filterContext.Provider >
            <div className="pt-16" >
                <CreateAppointment />
                {/* <div className="mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div> */}
            </div>
        </filterContext.Provider>
    )

    // return (<div>asdasd</div>)
}
