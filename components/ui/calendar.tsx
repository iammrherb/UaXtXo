"use client"

import * as React from "react"
import { Calendar as CalendarPrimitive } from "react-day-picker"

import { cn } from "@/lib/utils"

const Calendar = React.forwardRef<
  React.ElementRef<typeof CalendarPrimitive>,
  React.ComponentPropsWithoutRef<typeof CalendarPrimitive>
>(({ className, classNames, showOutsideDays = false, ...props }, ref) => {
  return (
    <CalendarPrimitive
      ref={ref}
      className={cn("p-3", className)}
      classNames={{
        ...classNames,
        day: cn(
          "h-9 w-9 p-0 text-sm [&:has([data-state=selected])]:bg-accent [&:has([data-state=selected])]:text-accent-foreground focus:relative focus:outline-none",
        ),
        day_today: cn("relative before:absolute before:inset-0 before:rounded-full before:bg-secondary before:z-[-1]"),
        day_outside: cn("text-muted-foreground opacity-50", showOutsideDays ? "opacity-100" : "hidden"),
        day_disabled: cn("text-muted-foreground opacity-50"),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_icon: "relative h-4 w-4 stroke-muted-foreground/70",
        ...classNames,
      }}
      {...props}
    />
  )
})
Calendar.displayName = "Calendar"

export { Calendar }
