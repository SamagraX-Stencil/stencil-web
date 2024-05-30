/* eslint-disable @typescript-eslint/no-explicit-any */
export type ListItemType={
    id: string;
    label?: string;
    secondaryLabel?: string;
    icon?: React.ReactElement;
    secondaryAction?: React.ReactElement;
    avatar?: string;
    items?: Array<ListItemType>;
    onClick?: (arg?:any)=>void ;
    isDivider?: boolean;
};


export type ListType={
    items: Array <ListItemType>,
    label ?: string,
    noItem ?: {
        label ?: string,
        icon ?: React.ReactElement
    }
}

