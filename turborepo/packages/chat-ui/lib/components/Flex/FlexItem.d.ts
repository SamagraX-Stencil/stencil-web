import React from 'react';
export interface FlexItemProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    flex?: string;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    order?: number;
}
export declare const FlexItem: (props: FlexItemProps) => React.JSX.Element;
