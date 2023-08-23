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
import { fetchAllConditions } from "@/api/prescription";
import { useQuery } from "react-query";
import { Condition } from "@/features/createPrescription/interfaces/condition.interface";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { filterContext } from "..";


export const ConditionFilter = () => {

    const [ conditions, set_conditions] = useState([] as Array<Condition>);
    const [ selected_conditions, set_selected_conditions ] = useState([] as Array<Condition>);

    const { filter, set_filter } = useContext(filterContext);

    const fetchAllConditionsQuery = useQuery('getAllConditions', fetchAllConditions)
    
    useEffect(
        () => {
            if (fetchAllConditionsQuery.status == 'success') {
                set_conditions(fetchAllConditionsQuery.data);
            }
        }, [fetchAllConditionsQuery.data]
    )

    useEffect( 
        () => {
            set_filter({...filter, conditions: selected_conditions})
        }, [ selected_conditions ]
     )

    const isSelected = (cond:Condition) : boolean => {
        return selected_conditions.findIndex( s_cond => s_cond.id == cond.id && s_cond.name == cond.name ) != -1
    }

    const toggleConditionSelect = (cond:Condition) => {
        if( !isSelected(cond) ){
            set_selected_conditions( [...selected_conditions, cond] );
        } else {
            set_selected_conditions( selected_conditions.filter( s_cond => s_cond.id != cond.id && s_cond.name != cond.name ) );
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="text-sm py-1 h-auto">Filter conditions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Command className="rounded-lg mt-2 border shadow-md">
                    <div className="rounded-lg p-2" >
                        { selected_conditions.map( cond => <Badge key={cond.id} className="m-1" variant={"outline"} > {cond.name} </Badge> ) }
                    </div>
                    <CommandInput placeholder="Filter condition" />
                    <CommandList>
                        <CommandEmpty className='flex flex-row items-center justify-center py-8' >
                            Not found
                        </CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {conditions.map((cond) => (
                                <CommandItem key={cond.id} className={`border mr-4 my-2 font-normal ${isSelected(cond) && "bg-accent"} `} >
                                    <span onClick={ () => toggleConditionSelect(cond)} >{cond.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}