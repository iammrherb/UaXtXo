"use client"

import * as React from "react"
import { ResizableHandle, ResizablePanel, Resizable } from "react-resizable-panels"
import { cn } from "@/lib/utils"

interface ResizableLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  orientation: "horizontal" | "vertical"
}

const ResizableLayout = React.forwardRef<HTMLDivElement, ResizableLayoutProps>(
  ({ className, children, orientation, ...props }, ref) => {
    return (
      <Resizable
        ref={ref}
        className={cn("relative flex", orientation === "horizontal" ? "h-full" : "w-full")}
        {...props}
      >
        {children}
      </Resizable>
    )
  },
)
ResizableLayout.displayName = "ResizableLayout"

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  minSize?: number
  maxSize?: number
  order?: number
}

const ResizablePanelWrapper = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, children, minSize, maxSize, order, ...props }, ref) => {
    return (
      <ResizablePanel
        ref={ref}
        className={cn("relative flex-1 overflow-hidden", className)}
        minSize={minSize}
        maxSize={maxSize}
        order={order}
        {...props}
      >
        {children}
      </ResizablePanel>
    )
  },
)
ResizablePanelWrapper.displayName = "ResizablePanelWrapper"

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation: "horizontal" | "vertical"
}

const ResizableHandleWrapper = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, orientation, ...props }, ref) => {
    return (
      <ResizableHandle
        ref={ref}
        className={cn(
          "relative z-10 flex items-center justify-center touch-none",
          orientation === "horizontal" ? "h-full w-1.5 cursor-ew-resize" : "h-1.5 w-full cursor-ns-resize",
          className,
        )}
        {...props}
      />
    )
  },
)
ResizableHandleWrapper.displayName = "ResizableHandleWrapper"

export { ResizableLayout, ResizablePanelWrapper, ResizableHandleWrapper }
