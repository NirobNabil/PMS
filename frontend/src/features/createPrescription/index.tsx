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

// custom component imports
import { InputField } from './components/InputField'
import { Medicine } from './interfaces/medicine.interface'
import { Condition } from './interfaces/condition.interface'
import { createPrescription, fetchAllMedicines, fetchAllConditions } from '@/api/prescription'
import { createPatient, findPatientByPhone } from '@/api/patient'




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
    note: z.string()
})

export const CreatePrescriptionPage = () => {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            phone: "",
            issue: "",
            age: "",
            medicines: [],
            note: "",
            conditions: []
        }
    })


    const [condition_search_text, set_condition_search_text] = useState("");


    // this list contains the list of medicine/condition names that can be selected using the toggle buttons
    // and are displayed at the top of the medicines/condtion section
    const [recent_medicines, set_recent_medicines] = useState([] as Array<Medicine>);
    const [recent_conditions, set_recent_conditions] = useState([] as Array<Condition>);


    // fetches all medicines/conditions to be displayed in the searchbar
    const fetchAllMedicinesQuery = useQuery('getAllMedicines', fetchAllMedicines)
    const fetchAllConditionsQuery = useQuery('getAllConditions', fetchAllConditions)

    useEffect(
        () => {
            if (fetchAllMedicinesQuery.status == 'success') {
                set_recent_medicines(fetchAllMedicinesQuery.data);
            }
        }, [fetchAllMedicinesQuery.data]);

    useEffect( 
        () => {
            if( fetchAllConditionsQuery.status == 'success' ) {
                set_recent_conditions(fetchAllConditionsQuery.data);
            }
        }, [fetchAllConditionsQuery.data]
    )


    // this function is called when user searches for medicines and clicks on one. This function 
    // then adds the selected medicine to the toggle buttons list which is actually the recent_medicines list
    const addNewMedicineToRecentMedicines = (medicine: Medicine) => {
        const new_medicines = recent_medicines;
        if (new_medicines.findIndex(v => v.id === medicine.id) == -1) {
            set_recent_medicines([...recent_medicines, medicine]);
        }
        onMedicineToggle(medicine, true);
    }
    const addNewConditionToRecentConditions = (condition: Condition) => {
        const new_conditions = recent_conditions;
        if (new_conditions.findIndex(v => v.id === condition.id) == -1) {
            set_recent_conditions([...recent_conditions, condition]);
        }
        onConditionToggle(condition, true);
    }


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
        }

        await createPrescription({
            patient: patient,
            medicines: data.medicines as Medicine[],
            note: data.note,
            conditions: data.conditions as Condition[],
        })

        toast({
            title: "Prescription created",
            description: `Patient - ${patient.name} - ${patient.phone}`,
        })

    }


    const onMedicineToggle = (med: Medicine, pressed: boolean) => {

        const current_medicines = form.getValues('medicines') as Medicine[];

        if (pressed) {
            form.setValue('medicines', [...current_medicines, med]);
        } else {
            form.setValue('medicines', current_medicines?.filter(cur => cur.id != med.id));
        }

        // this triggers the validation process of the form and also registers the change of value inside the form
        form.trigger('medicines').then(() => console.log("medicine", form.getValues(), form.formState));

    }
    const onConditionToggle = (cond: Condition, pressed: boolean) => {

        const current_conditions = form.getValues('conditions') as Medicine[];

        if (pressed) {
            form.setValue('conditions', [...current_conditions, cond]);
        } else {
            form.setValue('conditions', current_conditions?.filter(cur => cur.id != cond.id));
        }

        // this triggers the validation process of the form and also registers the change of value inside the form
        form.trigger('conditions').then(() => console.log("medicine", form.getValues(), form.formState));

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">

                <InputField form={form} name="name" label="নাম" placeholder="বামন গিন্নি" itemClassName="align-left" />

                <div className="flex" >
                    <InputField form={form} name="age" label="বয়স" placeholder="২২" itemClassName="w-1/2 mr-4" labelClassName="align-left" />
                    <InputField form={form} name="phone" label="ফোন" placeholder="০১৮৪৮৩৩৩৩৮৫" itemClassName="w-1/2" labelClassName="align-left" />
                </div>

                {/* <InputField form={form} name="issue" label="সমস্যা" placeholder="আমি তোমারে চোখে দেখি না" labelClassName="align-left" textarea /> */}

                <FormField
                    control={form.control}
                    name="medicines"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className="align-left" >ঔষধ / ড্রপ</FormLabel>
                                <FormControl>
                                    <div>
                                        {recent_medicines.map((med) => (
                                            <Toggle
                                                pressed={field.value && field.value.findIndex(v => v.id == med.id) != -1}
                                                key={med.id}
                                                onPressedChange={pressed => onMedicineToggle(med, pressed)}
                                                className="border mr-4 my-2 font-normal"
                                            >
                                                {med.name}
                                            </Toggle>
                                        ))}
                                        <Command className="rounded-lg mt-2 border shadow-md">
                                            <CommandInput placeholder="Type a command or search..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No medicine found
                                                </CommandEmpty>
                                                <CommandGroup heading="Suggestions">
                                                    {recent_medicines.map((med) => (
                                                        <CommandItem key={med.id} className="border mr-4 my-2 font-normal" >
                                                            <span onClick={() => addNewMedicineToRecentMedicines(med)} >{med.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name="conditions"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className="align-left" >রোগ / সমস্যা</FormLabel>
                                <FormControl>
                                    <div>
                                        {recent_conditions.map((cond) => (
                                            <Toggle
                                                pressed={field.value && field.value.findIndex(v => v.id == cond.id) != -1}
                                                key={cond.id}
                                                onPressedChange={pressed => onConditionToggle(cond, pressed)}
                                                className="border mr-4 my-2 font-normal"
                                            >
                                                {cond.name}
                                            </Toggle>
                                        ))}
                                        <Command value={condition_search_text} onValueChange={set_condition_search_text} className="rounded-lg mt-2 border shadow-md">
                                            <CommandInput placeholder="Type a condition or search..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    <CommandItem key={"new condition"} className="border mr-4 my-2 font-normal" >
                                                        <span onClick={() => addNewConditionToRecentConditions({
                                                            id: "",
                                                            name: condition_search_text
                                                        })} >{condition_search_text}</span>
                                                    </CommandItem>
                                                </CommandEmpty>
                                                <CommandGroup heading="Suggestions">
                                                    {recent_conditions.map((cond) => (
                                                        <CommandItem key={cond.id} className="border mr-4 my-2 font-normal" >
                                                            <span onClick={() => addNewConditionToRecentConditions(cond)} >{cond.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <InputField form={form} name="note" label="নোট" placeholder="দেইখাও তো দেখবা না" labelClassName="align-left" textarea />

                <Button type="submit" >Submit</Button>
            </form>
        </Form>
    )
}


