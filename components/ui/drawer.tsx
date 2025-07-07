"use client"

import * as React from "react"
import * as RadixDrawer from "@radix-ui/react-drawer"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Drawer = RadixDrawer.Root
const DrawerTrigger = RadixDrawer.Trigger
const DrawerClose = RadixDrawer.Close
const DrawerPortal = RadixDrawer.Portal

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDrawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDrawer.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDrawer.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
DrawerOverlay.displayName = RadixDrawer.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof RadixDrawer.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDrawer.Content>
>(({ className, children, side = "left", ...props }, ref) => (
  <DrawerPortal>
    <RadixDrawer.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[side=right]:slide-in-from-right-0 data-[side=bottom]:slide-in-from-bottom-0 data-[side=left]:slide-in-from-left-0 data-[side=top]:slide-in-from-top-0",
        side === "right" && "right-0 border-l data-[state=closed]:slide-out-to-right-0",
        side === "left" && "left-0 border-r data-[state=closed]:slide-out-to-left-0",
        side === "top" && "top-0 border-b data-[state=closed]:slide-out-to-top-0",
        side === "bottom" && "bottom-0 border-t data-[state=closed]:slide-out-to-bottom-0",
        className,
      )}
      {...props}
    >
      {children}
      <RadixDrawer.Close asChild>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </RadixDrawer.Close>
    </RadixDrawer.Content>
  </DrawerPortal>
))
DrawerContent.displayName = RadixDrawer.Content.displayName

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof RadixDrawer.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDrawer.Title>
>(({ className, ...props }, ref) => (
  <RadixDrawer.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = RadixDrawer.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof RadixDrawer.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDrawer.Description>
>(({ className, ...props }, ref) => (
  <RadixDrawer.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DrawerDescription.displayName = RadixDrawer.Description.displayName

const DrawerAction = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, ...props }, ref) => <Button ref={ref} className={cn("sm:w-auto", className)} {...props} />,
)
DrawerAction.displayName = "DrawerAction"

const DrawerCancel = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, ...props }, ref) => (
    <Button variant="ghost" ref={ref} className={cn("mt-2 sm:mt-0 sm:w-auto", className)} {...props} />
  ),
)
DrawerCancel.displayName = "DrawerCancel"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerAction,
  DrawerClose,
  DrawerCancel,
}
