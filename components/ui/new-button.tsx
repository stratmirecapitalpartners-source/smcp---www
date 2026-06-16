import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"


// make it DRY
const newButtonBase = "px-10 py-5 hover:cursor-pointer font-headline border border-primary font-extrabold text-xs uppercase tracking-widest rounded-md hover:brightness-110 shadow-xl hover:shadow-md transition-all"

const newButtonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-primary hover:bg-white hover:border-primary text-white hover:text-primary ",
                secondary: "bg-white hover:bg-primary hover:border-primary text-primary hover:text-white"
            }
        },
        defaultVariants: {
            variant: "primary",
        },
    }
)



function NewButton({
    className,
    variant = "primary",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof newButtonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot.Root : "button"

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            className={cn(newButtonVariants({ variant, className }), newButtonBase)}
            {...props}
        />
    )
}


export { NewButton, newButtonVariants }
