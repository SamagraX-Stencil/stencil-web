import React from 'react';
import { CheckboxProps, CheckboxValue } from './Checkbox';
export type CheckboxGroupProps = {
    className?: string;
    options: CheckboxProps[];
    value: CheckboxValue[];
    name?: string;
    disabled?: boolean;
    block?: boolean;
    onChange: (value: CheckboxValue[], event: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare const CheckboxGroup: (props: CheckboxGroupProps) => React.JSX.Element;
