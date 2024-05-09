import React from 'react';
export type As<T = any> = React.ElementType<T>;
export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
    as?: As;
    className?: string;
    center?: boolean;
    inline?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    justifyContent?: FlexProps['justify'];
    align?: 'flex-start' | 'flex-end' | 'center';
    alignItems?: FlexProps['align'];
    children?: React.ReactNode;
}
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLElement>>;
