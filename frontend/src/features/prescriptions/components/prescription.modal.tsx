import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useQuery } from 'react-query'


// UI imports
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"



// custom component imports
import { fetchOnePrescription } from "@/api/prescription"
import { useParams } from "react-router-dom"
import { CreatePrescriptionForm } from '@/features/createPrescription/components/createForm'
import { ScrollArea } from '@/components/ui/scroll-area'


const FormSchema = z.object({
    name: z.string(),
    phone: z.string(),
    age: z.string(),  // this should be an integer
    issue: z.string(),
    medicines: z.object({
        id: z.string(),
        name: z.string(),
        generic_name: z.string(),
        producer: z.string()
    }).array().optional(),
    conditions: z.object({
        id: z.string(),
        name: z.string(),
    }).array().optional(),
    note: z.string(),
    appointment_id: z.string(),
})

//TODO: Complete it
export function PrescriptionModal({  }) {

    const params = useParams();

    console.log(params.id);

    console.log(params);

    if( !params.id ) return <></>;

    const getPrescriptionQuery = useQuery({
        queryKey: ['getOnePrescription', params.id], 
        queryFn: () => fetchOnePrescription( params.id ),
        select: (data) => ({
            ...data,
            name: data.patient.name,
            phone: data.patient.phone,
            age: data.patient.age
        })
        // onSuccess: (data) => set_data(data)
    });

    console.log(getPrescriptionQuery.data);

    // return <></>;

    return (
        getPrescriptionQuery.status == 'success' &&
        <Dialog defaultOpen={true} >
            <DialogContent style={{maxHeight: '90vh', maxWidth: '80vw', overflow: 'hidden'}} >
                <DialogHeader className='mb-2' >
                    <DialogTitle>Prescription Details</DialogTitle>
                </DialogHeader>
                
                <ScrollArea style={{maxHeight: '80vh'}} >
                    <CreatePrescriptionForm viewOnly={true} initialValues={getPrescriptionQuery.data} onSubmit={(data) => console.log(data)} />
                </ScrollArea>

                {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}