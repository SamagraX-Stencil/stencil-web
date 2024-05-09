/// <reference types="react" />
type Container = React.RefObject<any> | Element | (() => Element) | null;
export interface PortalProps {
    container?: Container;
    onRendered?: () => void;
    children?: React.ReactNode;
}
export declare const Portal: (props: PortalProps) => import("react").ReactPortal | null;
export {};
