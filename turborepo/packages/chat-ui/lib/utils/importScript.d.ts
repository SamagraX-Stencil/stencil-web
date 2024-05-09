declare global {
    interface Window {
        [index: string]: any;
    }
}
export declare function importScript(url: string, name: string): Promise<unknown>;
