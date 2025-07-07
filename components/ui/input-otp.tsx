"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface InputOTPProps extends React.HTMLAttributes<HTMLDivElement> {
  length: number
  onChange: (value: string) => void
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(({ length, onChange, className, ...props }, ref) => {
  const [otp, setOtp] = React.useState("")
  const inputRefs = React.useRef<HTMLInputElement[]>([])

  React.useEffect(() => {
    if (otp.length === length) {
      onChange(otp)
    }

    return () => {
      onChange("")
    }
  }, [otp, length, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    if (isNaN(Number(value))) return

    const newOtp = otp.split("")
    newOtp[index] = value[0] || ""

    const newOtpString = newOtp.join("")
    setOtp(newOtpString)

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className={cn(
              "w-12 h-12 text-2xl font-bold text-center rounded border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "mx-1",
            )}
            value={otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(input) => (inputRefs.current[index] = input!)}
          />
        ))}
    </div>
  )
})
InputOTP.displayName = "InputOTP"

export { InputOTP }
