import React from 'react';
export type LazyComponentResult = React.LazyExoticComponent<React.ComponentType<any>> & {
    WrappedComponent?: React.ComponentType<any>;
};
export declare function lazyComponent(url: string, name: string, success?: () => void, fail?: (err: Error) => void): LazyComponentResult;
