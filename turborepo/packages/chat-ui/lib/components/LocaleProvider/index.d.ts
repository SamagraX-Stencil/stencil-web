import React from 'react';
type ILocales = {
    [k: string]: any;
};
type ILocaleContext = {
    locale?: string;
    locales?: ILocales;
    children?: React.ReactNode;
};
declare const LocaleContext: React.Context<ILocaleContext>;
declare const LocaleProvider: {
    ({ locale, locales, children }: ILocaleContext): React.JSX.Element;
    defaultProps: {
        locale: string;
    };
};
declare const useLocale: (comp?: string, fallback?: any) => {
    locale: string | undefined;
    trans: (key?: string) => any;
};
export { LocaleProvider, LocaleContext, useLocale };
