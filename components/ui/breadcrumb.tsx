"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative inline-flex items-center", className)} {...props} />
})
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentProps<"ol">>(
  ({ className, ...props }, ref) => {
    return <ol ref={ref} className={cn("inline-flex items-center m-0 p-0 list-none", className)} {...props} />
  },
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("inline-flex items-center", className)} {...props} />
})
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
  ({ className, ...props }, ref) => {
    const pathname = usePathname()
    const isActive = pathname === props.href

    return (
      <Link
        ref={ref}
        className={cn(
          "inline-flex items-center text-sm font-medium transition-colors hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 data-[active=true]:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground",
          className,
        )}
        {...props}
      />
    )
  },
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center text-sm font-medium text-foreground", className)}
        {...props}
      />
    )
  },
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("mx-1 inline-flex items-center text-sm text-muted-foreground", className)}
        aria-hidden="true"
        {...props}
      >
        /
      </span>
    )
  },
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator }
