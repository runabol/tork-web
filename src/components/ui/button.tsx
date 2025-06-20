import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:bg-gray-200 dark:disabled:bg-gray-800 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'border text-red-700 dark:text-red-500 border-red-600/40 bg-red-50 dark:bg-red-500/20 dark:hover:bg-red-500/40 hover:bg-red-100',
        outline:
          'border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 dark:border-gray-700',
        success:
          'border text-green-700 dark:text-green-500 border-green-600/40 bg-green-50 dark:bg-green-500/30 dark:hover:bg-green-500/40 hover:bg-green-100',
        warning:
          'border text-orange-700 dark:text-orange-500 border-orange-600/40 bg-orange-50 dark:bg-orange-500/30 dark:hover:bg-orange-500/40 hover:bg-orange-100',
        info: 'border text-blue-700 dark:text-blue-500 border-blue-600/40 bg-blue-50 dark:bg-blue-500/30 dark:hover:bg-blue-500/40 hover:bg-blue-100',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
