import React from 'react';
export type StepStatus = 'success' | 'fail' | 'abort';
export type StepProps = {
    className?: string;
    active?: boolean;
    completed?: boolean;
    disabled?: boolean;
    status?: StepStatus;
    index?: number;
    title?: string;
    subTitle?: string;
    desc?: React.ReactNode;
    children?: React.ReactNode;
};
export declare const Step: React.ForwardRefExoticComponent<StepProps & React.RefAttributes<HTMLLIElement>>;
