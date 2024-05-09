import React from 'react';
export type TreeNodeProps = {
    title: string;
    content?: string;
    link?: string;
    onClick: (data: any) => void;
    onExpand: (title: string, isFolded: boolean) => void;
    children: any[];
};
export declare const TreeNode: React.FC<TreeNodeProps>;
