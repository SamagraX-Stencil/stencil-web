import React from 'react';
import './style.css';
export interface IJsonToTableProps {
    id?: string;
    json: any;
    styles?: React.CSSProperties;
}
export declare const JsonToTable: React.FC<IJsonToTableProps>;
