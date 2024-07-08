import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300",
    {
        variants: {
            variant: {
                default:
                    "bg-green-600 text-white hover:bg-green-700 transition-all active:scale-95 ease-in-out",
                destructive:
                    "bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90 transition-all active:scale-95 ease-in-out",
                outline:
                    "border border-green-600 bg-white active:bg-green-200 text-gray-700   dark:border-green-800 dark:bg-green-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 transition-all active:scale-95 ease-in-out",
                secondary:
                    "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80 transition-all active:scale-95 ease-in-out",
                ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 transition-all active:scale-95 ease-in-out",
                link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
                xs: "h-5 w-5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
