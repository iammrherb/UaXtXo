"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const NavigationMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("group relative flex items-center", className)} {...props}>
      {children}
    </div>
  ),
)
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        "group-data-[menu-open=true]:shadow-md group-data-[menu-open=true]:ring-1 group-data-[menu-open=true]:ring-ring group-data-[menu-open=true]:ring-offset-2 flex gap-3 rounded-md p-1 text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  ),
)
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => <li ref={ref} className={cn("relative", className)} {...props} />,
)
NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuLinkStyle = cva(
  "block select-none space-y-0.5 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground sm:text-sm",
)

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & VariantProps<typeof navigationMenuLinkStyle>
>(({ className, children, ...props }, ref) => {
  return (
    <Link ref={ref} className={cn(navigationMenuLinkStyle(), className)} {...props}>
      {children}
    </Link>
  )
})
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute top-0 left-0 w-full origin-top-center data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 sm:w-auto",
        className,
      )}
      {...props}
    />
  ),
)
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "group inline-flex h-12 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground sm:h-9 sm:px-3",
      className,
    )}
    {...props}
  >
    {children}
  </Link>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto max-w-md overflow-hidden rounded-md shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80 sm:max-w-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
}
