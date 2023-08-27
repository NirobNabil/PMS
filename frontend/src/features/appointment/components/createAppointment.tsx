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
import { Clock } from "./clock";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAppointment } from "@/api/appointment";


const FormSchema = z.object({
    name: z.string(),
    phone: z.string(),
    note: z.string(),
    datetime: z.date(),
})

export function CreateAppointment() {

    const { toast } = useToast();
    const [ dateTime, set_dateTime ] = useState(new Date());

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            name: "",
            phone: "",
            note: "",
            datetime: new Date()
        },
    });

    const onSubmit = async (data : z.infer<typeof FormSchema>) => {

        const final_data = {
            patient: { id: "", name: data.name, phone: data.phone },
            note: data.note,
            datetime: data.datetime
        };

        try{
            const ret = await createAppointment(final_data);
            console.log(ret);
            toast({
                title: "Appointment Created",
                description: `${final_data.patient.name} : ${final_data.patient.phone} : ${final_data.datetime}` 
            })
        } catch(e) {
            toast({
                title: "Couldn't creat Appointment",
            })
        }
    }

    useEffect(() => {
        form.setValue('datetime', dateTime, { shouldValidate: true, shouldTouch: true });
    }, [dateTime])
        
    const set_date = date => {
        const d = new Date(dateTime);
        d.setDate(date.getDate());
        d.setMonth(date.getMonth());
        d.setFullYear(date.getFullYear());
        set_dateTime(d);
    }

    const set_time = time => {
        const d = new Date(dateTime);
        d.setHours( time.getHours(), time.getMinutes(), 0 )
        set_dateTime(d);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusSquare className="mr-2 h-4 w-4" /> Create New Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>New Appointment</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                    <Form {...form} >
                        <div className="w-80 h-full flex flex-col gap-4 " >
                            <Label className="pt-2" >Patient Details</Label>
                            <FormField 
                                control={form.control}
                                name="phone"
                                render={ ({ field }) => <Input placeholder="Phone" {...field} /> }
                            />
                            <FormField 
                                control={form.control}
                                name="name"
                                render={ ({ field }) => <Input placeholder="Name" {...field} /> }
                            />
                            <FormField 
                                control={form.control}
                                name="note"
                                render={ ({ field }) => <Textarea placeholder="Note" className="resize-none h-28" {...field} /> }
                            />
                        </div>
                        <div>
                            <Calendar
                                mode="single"
                                selected={dateTime}
                                // defaultMonth={form.getValues('datetime')}
                                // selected={filter.created_at}
                                onSelect={set_date}
                                // {...field}
                            />
                            <div className="flex justify-end items-center z-10" >
                                <Label className="mr-4 text-md " >Time: </Label>
                                <Clock onChange={set_time} />
                            </div>
                        </div>
                        
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
