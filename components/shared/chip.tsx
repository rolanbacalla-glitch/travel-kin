import * as React from 'react';
import { cn, getVibeColor } from '@/lib/utils';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'active' | 'vibe';
    vibe?: string;
    className?: string;
    children?: React.ReactNode;
    key?: React.Key;
}

export function Chip({ className, variant = 'default', vibe, children, ...props }: ChipProps) {
    const baseClasses = 'inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200';

    const variantClasses = {
        default: 'bg-sand-100 text-neutral-700 hover:bg-sand-200',
        active: 'bg-ocean-500 text-white',
        vibe: vibe ? getVibeColor(vibe) : 'bg-sand-100 text-neutral-700',
    };

    return (
        <span
            className={cn(baseClasses, variantClasses[variant], className)}
            {...props}
        >
            {children}
        </span>
    );
}

interface ChipGroupProps {
    children?: React.ReactNode;
    className?: string;
}

export function ChipGroup({ children, className }: ChipGroupProps) {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {children}
        </div>
    );
}
