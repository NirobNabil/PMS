import { createMedicine } from "@/api/medicine"
import { Button } from "@/components/ui/button"
import DateTimePicker from 'react-datetime-picker';
import { TimePicker } from "@/components/ui/date-time-picker/time-picker"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Pill, PlusSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"


const FormSchema = z.object({
    name: z.string(),
    phone: z.string(),
    datetime: z.date(),
})

export function CreateAppointment() {

    const { toast } = useToast();
    const [ dateTime, set_dateTime ] = useState(new Date());

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            name: "",
            phone: "",
            datetime: new Date()
        },
    });

    const onSubmit = async (data : z.infer<typeof FormSchema>) => {
        console.log(data);
        // try{
        //     const ret = await createMedicine(data);
        //     toast({
        //         title: "Medicine Created",
        //         description: `${data.name} : ${data.generic_name} : ${data.producer}` 
        //     })
        // } catch(e) {
        //     toast({
        //         title: "Couldn't creat medicine",
        //     })
        // }
    }

    useEffect(() => {
        form.setValue('datetime', dateTime, { shouldValidate: true, shouldTouch: true });
    }, [dateTime])
        
    console.log(form.getValues('datetime'));

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusSquare className="mr-2 h-4 w-4" /> Create New Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Appointment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form} >
                        <FormField 
                            control={form.control}
                            name="phone"
                            render={ ({ field }) => <Input placeholder="Patient Phone" {...field} /> }
                        />
                        <FormField 
                            control={form.control}
                            name="name"
                            render={ ({ field }) => <Input placeholder="Patient Name" {...field} /> }
                        />
                        <Calendar
                            mode="single"
                            selected={dateTime}
                            defaultMonth={form.getValues('datetime')}
                            // selected={filter.created_at}
                            onSelect={set_dateTime}
                            // {...field}
                        />
                        {/* <FormField 
                            control={form.control}
                            name="datetime"
                            render={ ({ field }) => <TimePicker placeholder="Date & Time" {...field}  /> }
                        /> */}
                    </Form>
                </div>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} className="w-28" >Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
