import { Input } from "@/components/ui/input"
import { useContext } from "react";
import { filterContext } from "..";

export const InputFilter = (props) => {
    
    const { name, placeholder, className } = props;

    const { filter, set_filter } = useContext(filterContext);

    const onChange = (e) => {
        set_filter( {...filter, [name]: e.target.value} )
    }
    
    return (
        <Input placeholder={placeholder} onChange={onChange} className={className} />
    )
}