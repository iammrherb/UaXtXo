"use client"

import * as React from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface AccessibleDropdownProps {
  options: Option[]
  value?: string | string[]
  onValueChange: (value: string | string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  maxHeight?: string
  showSearch?: boolean
  clearable?: boolean
  groupBy?: (option: Option) => string
  renderOption?: (option: Option) => React.ReactNode
  ariaLabel?: string
  error?: string
}

export function AccessibleDropdown({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search options...",
  multiple = false,
  disabled = false,
  className,
  maxHeight = "300px",
  showSearch = true,
  clearable = false,
  groupBy,
  renderOption,
  ariaLabel,
  error
}: AccessibleDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : []
    }
    return typeof value === 'string' ? [value] : []
  }, [value, multiple])

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  const groupedOptions = React.useMemo(() => {
    if (!groupBy) return { '': filteredOptions }
    
    return filteredOptions.reduce((groups, option) => {
      const group = groupBy(option)
      if (!groups[group]) groups[group] = []
      groups[group].push(option)
      return groups
    }, {} as Record<string, Option[]>)
  }, [filteredOptions, groupBy])

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue]
      onValueChange(newValues)
    } else {
      onValueChange(optionValue)
      setOpen(false)
    }
  }

  const handleClear = () => {
    onValueChange(multiple ? [] : '')
  }

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder
    
    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0])
        return option?.label || selectedValues[0]
      }
      return `${selectedValues.length} selected`
    }
    
    const option = options.find(opt => opt.value === selectedValues[0])
    return option?.label || selectedValues[0]
  }

  // Keyboard navigation for the trigger
  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(!open)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={ariaLabel || "Select options"}
            aria-describedby={error ? "dropdown-error" : undefined}
            aria-invalid={!!error}
            className={cn(
              "w-full justify-between",
              error && "border-destructive",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
            onKeyDown={handleTriggerKeyDown}
          >
            <span className="truncate">{getDisplayValue()}</span>
            <div className="flex items-center gap-2">
              {clearable && selectedValues.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                  aria-label="Clear selection"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-full p-0" 
          style={{ maxHeight }}
          align="start"
          onOpenAutoFocus={(e) => {
            // Focus search input if available, otherwise first option
            e.preventDefault()
          }}
        >
          <Command shouldFilter={false}>
            {showSearch && (
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
            
            <CommandList style={{ maxHeight: `calc(${maxHeight} - 60px)` }}>
              <CommandEmpty>
                {searchQuery ? "No options found." : "No options available."}
              </CommandEmpty>
              
              {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <CommandGroup key={groupName} heading={groupName || undefined}>
                  {groupOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5",
                        option.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {multiple && (
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            selectedValues.includes(option.value)
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-input"
                          )}>
                            {selectedValues.includes(option.value) && (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          {renderOption ? renderOption(option) : (
                            <div>
                              <div className="font-medium">{option.label}</div>
                              {option.description && (
                                <div className="text-sm text-muted-foreground">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {!multiple && selectedValues.includes(option.value) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected items display for multiple selection */}
      {multiple && selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedValues.map((val) => {
            const option = options.find(opt => opt.value === val)
            return (
              <Badge
                key={val}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {option?.label || val}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-3 w-3 p-0 hover:bg-transparent"
                  onClick={() => handleSelect(val)}
                  aria-label={`Remove ${option?.label || val}`}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div id="dropdown-error" className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </div>
      )}

      {/* Alternative: Native select fallback for better accessibility */}
      <noscript>
        <select
          className="w-full mt-2 p-2 border rounded"
          multiple={multiple}
          aria-label={ariaLabel}
          onChange={(e) => {
            if (multiple) {
              const values = Array.from(e.target.selectedOptions, option => option.value)
              onValueChange(values)
            } else {
              onValueChange(e.target.value)
            }
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              selected={selectedValues.includes(option.value)}
            >
              {option.label}
            </option>
          ))}
        </select>
      </noscript>
    </div>
  )
}