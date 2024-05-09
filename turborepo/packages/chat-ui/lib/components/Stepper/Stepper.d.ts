import React from 'react';
import type { StepStatus } from './Step';
export type StepperProps = {
    className?: string;
    current?: number;
    status?: StepStatus;
    inverted?: boolean;
    children?: React.ReactNode;
};
export declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLUListElement>>;
