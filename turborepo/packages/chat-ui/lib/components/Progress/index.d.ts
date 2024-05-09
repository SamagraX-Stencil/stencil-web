import React from 'react';
export type ProgressProps = {
    className?: string;
    value: number;
    status?: 'active' | 'success' | 'error';
};
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
