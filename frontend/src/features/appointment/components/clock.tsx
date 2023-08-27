"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"



const Handle = ({ options, placeholder, value, set_value }) => {

    const [open, set_open] = useState(false);

    return (
        <Popover open={open} onOpenChange={set_open}>
            <PopoverTrigger asChild>
                <Button
                    style={{border: 0}}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {value}
                    {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandGroup>
                        <ScrollArea className="max-h-72" >
                        {options.map((t) => (
                            <CommandItem
                                key={t.value}
                                onSelect={(v) => {
                                    set_value(t.value)
                                    set_open(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === t.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {t.label}
                            </CommandItem>
                        ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


const generate = (start, end) => {
    const a = [];
    for (let i = start; i <= end; i++) {
        a.push(i);
    }
    return a;
}

const hours = generate(0, 12).map((v) => ({
    value: v, label: v
}))

const minutes = generate(0, 60).map((v) => ({
    value: v, label: v
}))

const am_pms = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' }
]


export function Clock({ onChange }) {

    const [open, set_open] = useState({
        hour: false,
        minute: false,
        am_pm: false
    })
    const [time, set_time] = useState({
        hour: 0,
        minute: 0,
        am_pm: 'PM'
    })

    useEffect( () => {
        const date = new Date();
        date.setHours( time.hour + ( time.am_pm == 'AM' ? 0 : 12 ), time.minute, 0 )
        onChange( date );
    }, [time] )


    return (
        <div className="border border-2 border-slate-400 rounded-lg w-max" >
            <Handle placeholder="HH" options={hours} value={time.hour} set_value={(v) => set_time({ ...time, hour: v })} /> :
            <Handle placeholder="MM" options={minutes} value={time.minute} set_value={(v) => set_time({ ...time, minute: v })} /> :
            <Handle placeholder="" options={am_pms} value={time.am_pm} set_value={(v) => set_time({ ...time, am_pm: v })} />
        </div>
    )

}