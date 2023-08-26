import { createMedicine } from "@/api/medicine"
import { Button } from "@/components/ui/button"
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


const FormSchema = z.object({
    name: z.string(),
    generic_name: z.string(),
    producer: z.string(),
})

export function CreateMedicine() {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            name: "",
            generic_name: "",
            producer: ""
        },
    });

    const onSubmit = async (data : z.infer<typeof FormSchema>) => {
        console.log(data);
        try{
            const ret = await createMedicine(data);
            toast({
                title: "Medicine Created",
                description: `${data.name} : ${data.generic_name} : ${data.producer}` 
            })
        } catch(e) {
            toast({
                title: "Couldn't creat medicine",
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusSquare className="mr-2 h-4 w-4" /> Create New Medicine
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Medicine</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form} >
                        <FormField 
                            control={form.control}
                            name="name"
                            render={ ({ field }) => <Input placeholder="Medicine name" {...field} /> }
                        />
                        <FormField 
                            control={form.control}
                            name="generic_name"
                            render={ ({ field }) => <Input placeholder="Generic name" {...field} /> }
                        />
                        <FormField 
                            control={form.control}
                            name="producer"
                            render={ ({ field }) => <Input placeholder="Producer" {...field} /> }
                        />
                    </Form>
                </div>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} className="w-28" >Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
