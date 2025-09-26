import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const loaderVariants = cva("flex items-center justify-center", {
    variants: {
        variant: {
            default: "text-primary",
            destructive: "text-destructive",
            secondary: "text-secondary-foreground",
            ghost: "text-muted-foreground",
        },
        size: {
            default: "size-6",
            sm: "size-4",
            lg: "size-8",
            xl: "size-12",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})

interface LoaderProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
    message?: string
    fullScreen?: boolean
    overlay?: boolean
}

function Loader({
    className,
    variant,
    size,
    message,
    fullScreen = false,
    overlay = false,
    ...props
}: LoaderProps) {
    const containerClasses = cn(
        fullScreen && "fixed inset-0 z-50",
        overlay && "absolute inset-0 bg-background/80 backdrop-blur-sm",
        fullScreen || overlay ? "flex items-center justify-center" : "",
        className
    )

    const spinnerClasses = cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        loaderVariants({ variant, size })
    )

    return (
        <div className={containerClasses} {...props}>
            <div className="flex flex-col items-center gap-3">
                <div className={spinnerClasses} />
                {message && (
                    <p className="text-sm text-muted-foreground animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

// Skeleton Loader Component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    count?: number
    height?: string
    width?: string
}

function Skeleton({
    className,
    count = 1,
    height = "h-4",
    width = "w-full",
    ...props
}: SkeletonProps) {
    return (
        <div className={cn("space-y-2", className)} {...props}>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        "animate-pulse rounded-md bg-muted",
                        height,
                        width
                    )}
                />
            ))}
        </div>
    )
}

// Async Loader Hook
function useAsyncLoader<T>() {
    const [state, setState] = React.useState<{
        loading: boolean
        data: T | null
        error: string | null
    }>({
        loading: false,
        data: null,
        error: null,
    })

    const execute = React.useCallback(async (asyncFunction: () => Promise<T>) => {
        setState({ loading: true, data: null, error: null })
        try {
            const result = await asyncFunction()
            setState({ loading: false, data: result, error: null })
            return result
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred"
            setState({ loading: false, data: null, error: errorMessage })
            throw error
        }
    }, [])

    const reset = React.useCallback(() => {
        setState({ loading: false, data: null, error: null })
    }, [])

    return { ...state, execute, reset }
}

export { Loader, Skeleton, useAsyncLoader, loaderVariants }