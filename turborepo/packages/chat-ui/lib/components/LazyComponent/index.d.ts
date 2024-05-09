import React from 'react';
import { LazyComponentProps, LazyComponentPropsWithCode, LazyComponentOnLoadParams } from './interface';
export type { LazyComponentProps, LazyComponentOnLoadParams };
export declare const LazyComponentWithCode: (props: LazyComponentPropsWithCode) => React.JSX.Element;
export declare const LazyComponent: (props: LazyComponentProps) => React.JSX.Element;
export default LazyComponent;
