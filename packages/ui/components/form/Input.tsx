import * as React from 'react';

import { motion } from 'framer-motion';

import { cn } from 'lib/utils/basic';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ animationKey, className, type, ...props }, ref) => {
        return (
            <motion.input
                key={animationKey}
                // initial={{ opacity: 1 }}
                // animate={{ opacity: 0.5 }}
                // exit={{ opacity: 0 }}
                // transition={{ duration: 0.3 }}
                type={type}
                className={cn(
                    'flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-100',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
