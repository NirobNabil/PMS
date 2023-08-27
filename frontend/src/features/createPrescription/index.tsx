"use client"

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useQuery } from 'react-query'

// UI imports
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Toggle } from "@/components/ui/toggle"
import { useToast } from "@/components/ui/use-toast"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"



// custom component imports
import { InputField } from './components/InputField'
import { Medicine } from './interfaces/medicine.interface'
import { Condition } from './interfaces/condition.interface'
import { createPrescription, fetchAllMedicines, fetchAllConditions } from '@/api/prescription'
import { createPatient, findPatientByPhone } from '@/api/patient'
import { fetchAllAppointments } from '@/api/appointment'
import { Appointment } from '../appointment/interfaces/appointment.interface'
import { CreatePrescriptionForm } from './components/createForm'


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

export const CreatePrescriptionPage = () => {

    const { toast } = useToast();

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        let patient;

        const existingPatientQuery = await findPatientByPhone(data.phone);

        // if no patient with the given phone exists then create a new one
        if (existingPatientQuery == null) {
            patient = (await createPatient({
                name: data.name,
                phone: data.phone
            }));
        } else {
            patient = existingPatientQuery;
            //TODO: Show a confirmation modal that a user with this phone number already exists and if he/she wants to proceed with it
        }

        await createPrescription({
            patient: patient,
            medicines: data.medicines as Medicine[],
            note: data.note,
            conditions: data.conditions as Condition[],
            appointment_id: data.appointment_id
        })

        toast({
            title: "Prescription created",
            description: `Patient - ${patient.name} - ${patient.phone}`,
        })

    }


    return (
        <CreatePrescriptionForm 
            viewOnly={false}
            initialValues={{
                name: "",
                phone: "",
                issue: "",
                age: "",
                medicines: [],
                note: "",
                conditions: [],
                appointment_id: ""
            }}
            onSubmit={onSubmit} 
        />
    )
}


