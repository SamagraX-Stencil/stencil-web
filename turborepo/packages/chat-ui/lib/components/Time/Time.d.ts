import React from 'react';
import { IDate } from './parser';
export interface TimeProps {
    date: IDate;
}
export declare const Time: ({ date }: TimeProps) => React.JSX.Element;
