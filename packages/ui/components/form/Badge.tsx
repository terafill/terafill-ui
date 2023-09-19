import * as React from 'react';

import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils/basic';

const badgeVariants = cva(
    'group inline-flex gap-2 items-center rounded-full border pl-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 overflow-x-hidden',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const badgeColorClasses = {
    red: 'bg-red-400',
    pink: 'bg-pink-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400',
    yellow: 'bg-yellow-400',
    gray: 'bg-gray-400',
    purple: 'bg-purple-400',
    orange: 'bg-orange-400',
    teal: 'bg-teal-400',
    indigo: 'bg-indigo-400'
};

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    badgeColor;
}

function Badge({ className, variant, badgeColor, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            <div className={cn(badgeColorClasses[badgeColor], `h-3 w-3 rounded-xl`)} />
            {props.children}
            <div className='w-4 h-4 group-hover:bg-gray-700 text-center rounded-md'>
                <Cross2Icon />
            </div>
        </div>
    );
}

export { Badge, badgeVariants };
