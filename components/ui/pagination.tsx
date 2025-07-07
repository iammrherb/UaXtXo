"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number
  totalCount: number
  siblingCount?: number
  pageSize: number
  onPageChange: (page: number) => void
}

const DOTS = "..."

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

function usePagination({ totalCount, pageSize, siblingCount = 1, page, onPageChange }: PaginationProps) {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalNumbers = siblingCount * 2 + 3
    if (totalPageCount <= totalNumbers) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, page])

  return paginationRange
}

const Pagination = ({
  className,
  page,
  totalCount,
  siblingCount,
  pageSize,
  onPageChange,
  ...props
}: PaginationProps) => {
  const paginationRange = usePagination({
    page,
    totalCount,
    siblingCount,
    pageSize,
    onPageChange,
  })

  if (page === 0 || paginationRange?.length === 0) {
    return null
  }

  const onNext = () => {
    onPageChange(page + 1)
  }

  const onPrevious = () => {
    onPageChange(page - 1)
  }

  const lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : null

  return (
    <div className={cn("inline-flex items-center justify-between", className)} {...props}>
      <Button
        variant="outline"
        className="h-8 w-8 p-0 bg-transparent"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onPrevious} disabled={page === 1}>
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginationRange?.map((item, index) => {
        if (item === DOTS) {
          return (
            <span key={index} className="h-8 w-8 p-0 text-sm text-muted-foreground">
              {item}
            </span>
          )
        }

        return (
          <Button
            key={index}
            variant="outline"
            className={cn("h-8 w-8 p-0", item === page ? "bg-accent text-accent-foreground" : "")}
            onClick={() => onPageChange(item)}
            disabled={item === page}
          >
            {item}
          </Button>
        )
      })}
      <Button variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={onNext} disabled={page === lastPage}>
        <span className="sr-only">Go to next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        className="h-8 w-8 p-0 bg-transparent"
        onClick={() => onPageChange(totalCount)}
        disabled={page === lastPage}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
Pagination.displayName = "Pagination"

export { Pagination, usePagination, DOTS }
