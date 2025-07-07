import * as React from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&:has([role=alert-dialog])]:pr-0", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 bg-destructive text-destructive-foreground [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, children, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant, className }))} {...props}>
    {children}
  </div>
))
Alert.displayName = "Alert"

const AlertIcon = React.forwardRef<React.ElementRef<"svg">, React.ComponentProps<typeof Info>>(
  ({ className, ...props }, ref) => (
    <Info ref={ref} className={cn("absolute left-4 top-4 h-4 w-4", className)} {...props} />
  ),
)
AlertIcon.displayName = "AlertIcon"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("mb-1 font-medium leading-none text-sm", className)} {...props}>
      {children}
    </p>
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm [&:not(:first-child)]:mt-2", className)} {...props}>
      {children}
    </p>
  ),
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, AlertIcon, alertVariants }
