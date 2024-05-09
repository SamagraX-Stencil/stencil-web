import React from 'react';
import { RadioProps, RadioValue } from './Radio';
export type RadioGroupProps = {
    className?: string;
    options: RadioProps[];
    value: RadioValue;
    name?: string;
    disabled?: boolean;
    block?: boolean;
    onChange: (value: RadioValue, event: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare const RadioGroup: (props: RadioGroupProps) => React.JSX.Element;
