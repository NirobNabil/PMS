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
import { InputField } from './InputField'
import { Medicine } from '../interfaces/medicine.interface'
import { Condition } from '../interfaces/condition.interface'
import { createPrescription, fetchAllMedicines, fetchAllConditions } from '@/api/prescription'
import { createPatient, findPatientByPhone } from '@/api/patient'
import { fetchAllAppointments } from '@/api/appointment'
import { Appointment } from '@/features/appointment/interfaces/appointment.interface'


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

export const CreatePrescriptionForm = ({ initialValues, onSubmit, viewOnly }) => {

    console.log("initial ", initialValues);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialValues
    })

    const [appointment_selection_open, set_apointment_selection_open] = useState(false);
    const [condition_search_text, set_condition_search_text] = useState("");

    // this list contains the list of medicine/condition names that can be selected using the toggle buttons
    // and are displayed at the top of the medicines/condtion section
    const [recent_medicines, set_recent_medicines] = useState([] as Array<Medicine>);
    const [recent_conditions, set_recent_conditions] = useState([] as Array<Condition>);
    const [appointments, set_appointments] = useState([] as Array<Appointment>);


    // fetches all medicines/conditions to be displayed in the searchbar
    const fetchAllMedicinesQuery = useQuery('getAllMedicines', fetchAllMedicines)
    const fetchAllConditionsQuery = useQuery('getAllConditions', fetchAllConditions)
    const fetchAllAppointmentsQuery = useQuery('getAllAppointments', fetchAllAppointments)

    useEffect(
        () => {
            if (fetchAllMedicinesQuery.status == 'success') {
                set_recent_medicines(fetchAllMedicinesQuery.data);
            }
        }, [fetchAllMedicinesQuery.data]);

    useEffect(
        () => {
            if (fetchAllConditionsQuery.status == 'success') {
                set_recent_conditions(fetchAllConditionsQuery.data);
            }
        }, [fetchAllConditionsQuery.data]
    )

    useEffect(
        () => {
            if (fetchAllAppointmentsQuery.status == 'success') {
                set_appointments(fetchAllAppointmentsQuery.data);
            }
        }, [fetchAllAppointmentsQuery.data]
    )

    useEffect(() => {
        Object.keys(initialValues).map(k => {
            console.log("g", k, initialValues[k])
            form.setValue(k, initialValues[k])
        });
    }, [])


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
        if (new_conditions.findIndex(v => v.id === condition.id && v.name == condition.name) == -1) {
            set_recent_conditions([...recent_conditions, condition]);
        }
        onConditionToggle(condition, true);
    }
    const selectAppointment = (appointment: Appointment) => {
        form.setValue('name', appointment.patient.name);
        form.setValue('phone', appointment.patient.phone);
        form.setValue('appointment_id', appointment.id);
        form.trigger('name');
        form.trigger('phone');
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6 p-2">
                {!viewOnly &&
                    <Popover open={appointment_selection_open} onOpenChange={set_apointment_selection_open}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full"
                            >
                                Select Appointment
                                {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-max-none w-[800px]">
                            <Command>
                                <CommandInput placeholder={"Type patient name"} />
                                <CommandGroup>
                                    <ScrollArea className="max-h-72" >
                                        {appointments.map((app) => (
                                            <CommandItem
                                                key={app.id}
                                                onSelect={() => {
                                                    console.log(app);
                                                    selectAppointment(app);
                                                    set_apointment_selection_open(false)
                                                }}
                                                className='p-4'
                                            >
                                                {/* <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    //  === t.value ? "opacity-100" : "opacity-0"
                                                )}
                                            /> */}
                                                {app.patient.name} - {app.patient.phone}
                                            </CommandItem>
                                        ))}
                                    </ScrollArea>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                }

                <InputField viewOnly={viewOnly} form={form} name="name" label="নাম" placeholder="বামন গিন্নি" itemClassName="align-left" />

                <div className="flex" >
                    <InputField viewOnly={viewOnly} form={form} name="age" label="বয়স" placeholder="২২" itemClassName="w-1/2 mr-4" labelClassName="align-left" />
                    <InputField viewOnly={viewOnly} form={form} name="phone" label="ফোন" placeholder="০১৮৪৮৩৩৩৩৮৫" itemClassName="w-1/2" labelClassName="align-left" />
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
                                                disabled={viewOnly}
                                                pressed={field.value && field.value.findIndex(v => v.id == med.id) != -1}
                                                key={med.id}
                                                onPressedChange={pressed => onMedicineToggle(med, pressed)}
                                                className="border mr-4 my-2 font-normal"
                                            >
                                                {med.name}
                                            </Toggle>
                                        ))}
                                        { 
                                            !viewOnly ?
                                        <Command className="rounded-lg mt-2 border shadow-md">
                                            <CommandInput placeholder="Type a command or search..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No medicine found
                                                </CommandEmpty>
                                                <CommandGroup heading="Suggestions">
                                                    {recent_medicines.map((med,i) => (
                                                        <CommandItem key={i} className="border mr-4 my-2 font-normal" >
                                                            <span onClick={() => addNewMedicineToRecentMedicines(med)} >{med.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command> : <></> }
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
                                                disabled={viewOnly}
                                                pressed={field.value && field.value.findIndex(v => v.id == cond.id) != -1}
                                                key={cond.id}
                                                onPressedChange={pressed => onConditionToggle(cond, pressed)}
                                                className="border mr-4 my-2 font-normal"
                                            >
                                                {cond.name}
                                            </Toggle>
                                        ))}
                                        { !viewOnly  ?                                 
                                        <Command className="rounded-lg mt-2 border shadow-md">
                                            <CommandInput value={condition_search_text} onValueChange={v => set_condition_search_text(v)} placeholder="Type a condition or search..." />
                                            <CommandList>
                                                <CommandEmpty className='flex flex-row items-center justify-center py-8' >
                                                    Create new condition
                                                    <Button
                                                        //type = button is mandatory because it prevents the whole form submitting on this click
                                                        type='button'
                                                        className='ml-4'
                                                        variant={"outline"}
                                                        onClick={() => addNewConditionToRecentConditions({
                                                            id: "",
                                                            name: condition_search_text
                                                        })}
                                                    >
                                                        {condition_search_text}
                                                    </Button>
                                                </CommandEmpty>
                                                <CommandGroup heading="Suggestions">
                                                    {recent_conditions.map((cond, i) => (
                                                        <CommandItem key={i} className="border mr-4 my-2 font-normal" >
                                                            <button type='button' onClick={() => addNewConditionToRecentConditions(cond)} >{cond.name}</button>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                        : <></>
                                                    }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <InputField viewOnly={viewOnly} form={form} name="note" label="নোট" placeholder="note" labelClassName="align-left" textarea />

                {!viewOnly &&
                    <Button type="submit" >Submit</Button>
                }
            </form>
        </Form>
    )
}


