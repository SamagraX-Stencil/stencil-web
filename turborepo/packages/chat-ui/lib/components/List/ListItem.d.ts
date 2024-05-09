import React from 'react';
interface ListItemPropsBase {
    className?: string;
    as?: React.ElementType;
    content?: React.ReactNode;
    rightIcon?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
}
interface ListItemPropsWithLink extends ListItemPropsBase {
    as: 'a';
    href: string;
}
export type ListItemProps = ListItemPropsBase | ListItemPropsWithLink;
export declare const ListItem: (props: ListItemProps) => React.JSX.Element;
export {};
