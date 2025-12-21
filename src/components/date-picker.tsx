"use client"

import { LucideCalendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useImperativeHandle, useState } from "react"
import { format } from "date-fns"

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
}

type DatePickerProps = {
  id: string
  name: string
  defaultValue?: string | undefined
  imperativeHandleRef?: React.Ref<ImperativeHandleFromDatePicker>;
}

const DatePicker = ({ id, name, defaultValue, imperativeHandleRef }: DatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  )

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    }
  }));

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  }

  return (

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" id={id} asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >

          <LucideCalendar />
          {formattedStringDate}
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
