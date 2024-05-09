import React from 'react';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    type: string;
    className?: string;
    name?: string;
    spin?: boolean;
}
export declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
