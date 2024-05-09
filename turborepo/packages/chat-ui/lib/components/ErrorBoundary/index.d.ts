import React from 'react';
export interface ErrorBoundaryState {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}
export interface FallbackProps {
    error: Error;
    errorInfo: React.ErrorInfo;
    [k: string]: any;
}
export type ErrorBoundaryProps = {
    FallbackComponent?: React.ComponentType<FallbackProps>;
    onError?: (error: Error, info: React.ErrorInfo) => void;
    [k: string]: any;
};
export declare class ErrorBoundary extends React.Component<React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
