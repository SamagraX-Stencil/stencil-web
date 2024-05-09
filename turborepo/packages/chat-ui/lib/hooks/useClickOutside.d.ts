/// <reference types="react" />
export default function useClickOutside<T extends HTMLElement = any>(handler: (event: any) => void, eventName?: string): import("react").MutableRefObject<T | undefined>;
