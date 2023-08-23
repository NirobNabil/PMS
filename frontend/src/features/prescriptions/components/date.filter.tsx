"use client"

import { useContext } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { filterContext } from "../index"


export function DateRangeFilter({ name, className }: React.HTMLAttributes<HTMLDivElement>) {
  
  const { filter, set_filter } = useContext(filterContext);

  const onSelect = (v) => {
    set_filter( {...filter, [name]: v} )
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-56 justify-start text-left font-normal",
              !filter.created_at && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filter.created_at?.from ? (
              filter.created_at.to ? (
                <>
                  {format(filter.created_at.from, "LLL dd, y")} -{" "}
                  {format(filter.created_at.to, "LLL dd, y")}
                </>
              ) : (
                format(filter.created_at.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={filter.created_at?.from}
            selected={filter.created_at}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
