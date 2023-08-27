import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export const InputField = (props : any) => {
    const { form, name, label, placeholder, itemClassName, labelClassName, textarea, viewOnly } = props;
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={itemClassName} >
                    <FormLabel className={labelClassName} >{label}</FormLabel>
                    <FormControl>
                        { 
                            textarea ?
                                <Textarea  disabled={viewOnly ? true : false} placeholder={placeholder} {...field} />
                            :
                                <Input disabled={viewOnly ? true : false} placeholder={placeholder} {...field} />
                        }
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}