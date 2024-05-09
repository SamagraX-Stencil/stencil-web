import React from 'react';
import { ScrollViewItemProps } from './Item';
export type ScrollViewProps<T> = Pick<ScrollViewItemProps, 'effect' | 'onIntersect'> & {
    data: Array<T>;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    fullWidth?: boolean;
    scrollX?: boolean;
    itemKey?: string | ((item: T, index: number) => string);
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    children?: React.ReactNode;
};
export interface ScrollViewHandle {
    scrollTo: (coord: {
        x?: number;
        y?: number;
    }) => void;
}
export declare const ScrollView: React.ForwardRefExoticComponent<Pick<ScrollViewItemProps, "effect" | "onIntersect"> & {
    data: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    className?: string | undefined;
    fullWidth?: boolean | undefined;
    scrollX?: boolean | undefined;
    itemKey?: string | ((item: any, index: number) => string) | undefined;
    onScroll?: ((event: React.UIEvent<HTMLDivElement, UIEvent>) => void) | undefined;
    children?: React.ReactNode;
} & React.RefAttributes<ScrollViewHandle>>;
