import { createContext, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./components/DataTable"
import { useQuery } from "react-query"
import { Medicine } from "../createPrescription/interfaces/medicine.interface"
import { CreateAppointment } from "./components/createAppointment"
import { fetchAllAppointments } from "@/api/appointment"
import { Appointment } from "./interfaces/appointment.interface"


//TODO: keeping the filter empty initially. is it a good idea? 
export const filterContext = createContext({ filter: {} });


export const AppointmentPage = () => {

    const [data, set_data] = useState([]);
    const [filter, set_filter] = useState({ name: "", generic_name: "", producer: "" });

    const getAppointmentsQuery = useQuery({
        queryKey: ['getAppointments', filter],
        queryFn: () => fetchAllAppointments(filter),
        select: (data) => {
            // modifies the server response to generate data format compatible to the DataTable
            return data.map(({ id, patient, datetime, prescription_id }) => ({
                id,
                patient_id: patient.id,
                name: patient.name,
                phone: patient.phone,
                datetime: (new Date(datetime)),
                prescription_id
            }));
        },
        onSuccess: (data) => set_data(data),
    });

    console.log(data);

    // useEffect( 
    //     () => {
    //         console.log(filter)
    //         getMedicinesQuery.refetch();
    //     }
    //     , [filter]
    //  )

    // useEffect(
    //     () => {
    //         if (getAppointmentsQuery.status == 'success') {
    //             const data = getAppointmentsQuery.data as Appointment[];
    //             const processed_data = data.map(({ id, patient, datetime }) => ({
    //                 id,
    //                 name: patient.name,
    //                 phone: patient.phone,
    //                 datetime: new Date(datetime),
    //             }));
    //             console.log("gg", processed_data)
    //             set_data(processed_data)
    //         }
    //     }, [getAppointmentsQuery.isLoading]
    // )

    return (
        // @ts-ignore
        <filterContext.Provider >
            <div className="pt-16" >
                <CreateAppointment />
                {data.length ?
                    <div className="mx-auto py-10">
                        <DataTable columns={columns} data={data} />
                    </div>
                    : <></>
                }
            </div>
        </filterContext.Provider>
    )

    // return (<div>asdasd</div>)
}
