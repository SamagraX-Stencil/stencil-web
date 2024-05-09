import { Toast, ToastProps } from './Toast';
declare function show(content: string, type?: ToastProps['type'], duration?: number): void;
export declare const toast: {
    show: typeof show;
    success(content: string, duration?: number): void;
    fail(content: string, duration?: number): void;
    loading(content: string, duration?: number): void;
};
export { Toast };
export type { ToastProps };
