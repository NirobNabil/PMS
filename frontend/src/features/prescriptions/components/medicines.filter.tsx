"use client"

import { useState, useEffect, useContext } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { fetchAllMedicines } from "@/api/prescription";
import { useQuery } from "react-query";
import { Medicine } from "@/features/createPrescription/interfaces/medicine.interface";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { filterContext } from "..";


export const MedicineFilter = () => {

    const [ medicines, set_medicines] = useState([] as Array<Medicine>);
    const [ selected_medicines, set_selected_medicines ] = useState([] as Array<Medicine>);

    const { filter, set_filter } = useContext(filterContext);

    const fetchAllMedicinesQuery = useQuery('getAllMedicines', fetchAllMedicines)

    useEffect(
        () => {
            if (fetchAllMedicinesQuery.status == 'success') {
                set_medicines(fetchAllMedicinesQuery.data);
            }
        }, [fetchAllMedicinesQuery.data]
    )

    useEffect( 
        () => {
            set_filter({...filter, medicines: selected_medicines})
        }, [ selected_medicines ]
     )

    const isSelected = (cond:Medicine) : boolean => {
        return selected_medicines.findIndex( s_cond => s_cond.id == cond.id && s_cond.name == cond.name ) != -1
    }

    const toggleMedicineSelect = (cond:Medicine) => {
        if( !isSelected(cond) ){
            set_selected_medicines( [...selected_medicines, cond] );
        } else {
            set_selected_medicines( selected_medicines.filter( s_cond => s_cond.id != cond.id && s_cond.name != cond.name ) );
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="text-sm py-1 h-auto">Filter medicines</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Command className="rounded-lg mt-2 border shadow-md">
                    <div className="rounded-lg p-2" >
                        { selected_medicines.map( cond => <Badge key={cond.id} className="m-1" variant={"outline"} > {cond.name} </Badge> ) }
                    </div>
                    <CommandInput placeholder="Filter medicine" />
                    <CommandList>
                        <CommandEmpty className='flex flex-row items-center justify-center py-8' >
                            Not found
                        </CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {medicines.map((cond) => (
                                <CommandItem key={cond.id} className={`border mr-4 my-2 font-normal ${isSelected(cond) && "bg-accent"} `} >
                                    <span onClick={ () => toggleMedicineSelect(cond)} >{cond.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}