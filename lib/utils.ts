import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / oldValue) * 100
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function roundToDecimal(value: number, decimals: number): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function arrayToObject<T>(array: T[], keyField: keyof T): Record<string, T> {
  return array.reduce(
    (obj, item) => {
      const key = String(item[keyField])
      obj[key] = item
      return obj
    },
    {} as Record<string, T>,
  )
}

export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const key = keyFn(item)
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

export function sortBy<T>(array: T[], keyFn: (item: T) => any, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aVal = keyFn(a)
    const bVal = keyFn(b)

    if (aVal < bVal) return direction === "asc" ? -1 : 1
    if (aVal > bVal) return direction === "asc" ? 1 : -1
    return 0
  })
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as unknown as T
  if (typeof obj === "object") {
    const clonedObj = {} as { [key: string]: any }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj as T
  }
  return obj
}

export function isEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false
    }
    return true
  }
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false
    }
    return true
  }
  return false
}

export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export function isEmpty(value: any): boolean {
  if (value == null) return true
  if (typeof value === "string" || Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

export function retry<T>(fn: () => Promise<T>, maxAttempts = 3, delay = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0

    const attempt = () => {
      attempts++
      fn()
        .then(resolve)
        .catch((error) => {
          if (attempts >= maxAttempts) {
            reject(error)
          } else {
            setTimeout(attempt, delay)
          }
        })
    }

    attempt()
  })
}

export function createRange(start: number, end: number, step = 1): number[] {
  const range: number[] = []
  for (let i = start; i <= end; i += step) {
    range.push(i)
  }
  return range
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function getRandomColor(): string {
  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}

export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return "#000000"

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? "#000000" : "#ffffff"
}

export function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {}
  const pairs = queryString.replace(/^\?/, "").split("&")

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=")
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "")
    }
  })

  return params
}

export function buildQueryString(params: Record<string, any>): string {
  const pairs: string[] = []

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    }
  })

  return pairs.length > 0 ? `?${pairs.join("&")}` : ""
}

export function downloadFile(data: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    return new Promise((resolve, reject) => {
      if (document.execCommand("copy")) {
        resolve()
      } else {
        reject(new Error("Copy to clipboard failed"))
      }
      document.body.removeChild(textArea)
    })
  }
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const width = window.innerWidth
  if (width < 768) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

export function isMobile(): boolean {
  return getDeviceType() === "mobile"
}

export function isTablet(): boolean {
  return getDeviceType() === "tablet"
}

export function isDesktop(): boolean {
  return getDeviceType() === "desktop"
}

export function getOS(): string {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"]
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"]
  const iosPlatforms = ["iPhone", "iPad", "iPod"]

  if (macosPlatforms.indexOf(platform) !== -1) return "Mac OS"
  if (iosPlatforms.indexOf(platform) !== -1) return "iOS"
  if (windowsPlatforms.indexOf(platform) !== -1) return "Windows"
  if (/Android/.test(userAgent)) return "Android"
  if (/Linux/.test(platform)) return "Linux"

  return "Unknown"
}

export function getBrowser(): string {
  const userAgent = navigator.userAgent

  if (userAgent.includes("Firefox")) return "Firefox"
  if (userAgent.includes("SamsungBrowser")) return "Samsung Internet"
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera"
  if (userAgent.includes("Edge")) return "Microsoft Edge"
  if (userAgent.includes("Chrome")) return "Chrome"
  if (userAgent.includes("Safari")) return "Safari"

  return "Unknown"
}

export function scrollToTop(smooth = true): void {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  })
}

export function scrollToElement(elementId: string, smooth = true): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "start",
    })
  }
}

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function waitForElement(selector: string, timeout = 5000): Promise<Element> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} not found within ${timeout}ms`))
    }, timeout)
  })
}

export function createEventEmitter<T extends Record<string, any>>() {
  const listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {}

  return {
    on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
      if (!listeners[event]) {
        listeners[event] = []
      }
      listeners[event]!.push(callback)
    },

    off<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
      if (listeners[event]) {
        const index = listeners[event]!.indexOf(callback)
        if (index > -1) {
          listeners[event]!.splice(index, 1)
        }
      }
    },

    emit<K extends keyof T>(event: K, data: T[K]) {
      if (listeners[event]) {
        listeners[event]!.forEach((callback) => callback(data))
      }
    },

    once<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
      const onceCallback = (data: T[K]) => {
        callback(data)
        this.off(event, onceCallback)
      }
      this.on(event, onceCallback)
    },
  }
}

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export function createStore<T>(initialState: T) {
  let state = initialState
  const listeners: Array<(state: T) => void> = []

  return {
    getState: () => state,

    setState: (newState: Partial<T> | ((prevState: T) => T)) => {
      if (typeof newState === "function") {
        state = newState(state)
      } else {
        state = { ...state, ...newState }
      }
      listeners.forEach((listener) => listener(state))
    },

    subscribe: (listener: (state: T) => void) => {
      listeners.push(listener)
      return () => {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    },
  }
}
