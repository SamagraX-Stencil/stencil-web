import React from 'react';
interface UseMountOptions {
    active?: boolean;
    ref: React.RefObject<any>;
    delay?: number;
}
declare function useMount({ active, ref, delay }: UseMountOptions): {
    didMount: boolean;
    isShow: boolean;
};
export default useMount;
