/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import JSONToTableUtils, { JSONObjectType, JSONObjectKeys } from './utils';
import './style.css';
export interface IJsonToTableProps {
  id?: string;
  json: any; // Consider specifying a more detailed type depending on your JSON structure
  styles?: React.CSSProperties;
}

export const JsonToTable: React.FC<IJsonToTableProps> = ({ json, id, styles }) => {
  const renderObject = (
    obj: any,
    header: string | undefined,
    idx: number,
  ): JSX.Element | JSX.Element[] => {
    const phrase: any = [];
    if (header) {
      phrase.push(renderRowHeader(header));
    }

    const objType: JSONObjectType = JSONToTableUtils.getObjectType(obj);
    let tmp: JSX.Element | JSX.Element[];

    switch (objType) {
      case JSONObjectType.ObjectWithNonNumericKeys:
        tmp = header ? (
          <table key={`__j2t_tableObj${idx}`}>
            <tbody key={`__j2t_bObj${idx}`}>{renderRows(obj)}</tbody>
          </table>
        ) : (
          renderRows(obj)
        );
        break;
      case JSONObjectType.Array:
        tmp = header ? (
          <table key={`__j2t_tableArr${idx}`}>
            <tbody key={`__j2t_bArr${idx}`}>{parseArray(obj)}</tbody>
          </table>
        ) : (
          parseArray(obj)
        );
        break;
      default:
        tmp = <></>; // Handle other cases or default to an empty fragment
    }

    phrase.push(tmp);
    return header ? (
      <tr key={`__j2t_trObj${idx}`}>{renderCell({ content: phrase, colspan: 2 })}</tr>
    ) : (
      phrase
    );
  };

  const getCellValue = (content: any): string => {
    return content === true || content === false ? content.toString() : content;
  };

  const renderCell = ({
    content,
    colspan = 1,
    isHeader = false,
  }: {
    content: any;
    colspan?: number;
    isHeader?: boolean;
    key?: any;
  }): JSX.Element => {
    const valueDisplay = isHeader ? (
      <strong>{getCellValue(content)}</strong>
    ) : (
      getCellValue(content)
    );
    return (
      <td colSpan={colspan} key={`__j2t_td${content}`}>
        {valueDisplay}
      </td>
    );
  };

  const renderHeader = (labels: string[]): JSX.Element => {
    return (
      <tr key={`__j2t_trHeader`}>
        {labels.map((v, index) => renderCell({ content: v, key: `header-${index}` }))}
      </tr>
    );
  };

  const renderValues = (values: any[]): JSX.Element => {
    return (
      <tr key={`__j2t_trArrString`}>
        {values.map((k, index) => renderCell({ content: k, key: `value-${index}` }))}
      </tr>
    );
  };

  const renderRowValues = (anArray: any[], labels: string[]): JSX.Element[] => {
    return anArray.map((item, idx) => {
      return (
        <tr key={`__j2t_Arr${idx}`}>
          {labels.map((k, index) => {
            const isValuePrimitive =
              JSONToTableUtils.getObjectType(item[k]) === JSONObjectType.Primitive;
            return isValuePrimitive
              ? renderCell({ content: item[k], key: `item-${idx}-${index}` })
              : renderObject(item[k], k, idx);
          })}
        </tr>
      );
    });
  };

  const parseArray = (anArray: any[]): JSX.Element[] => {
    const phrase: JSX.Element[] = [];
    const labels: JSONObjectKeys = JSONToTableUtils.getUniqueObjectKeys(anArray);
    if (JSONToTableUtils.checkLabelTypes(labels.labels) !== 'number') {
      phrase.push(renderHeader(labels.labels));
      phrase.push(...renderRowValues(anArray, labels.labels));
    } else {
      phrase.push(renderValues(anArray));
    }
    return phrase;
  };

  const renderRows = (obj: any): any => {
    return Object.keys(obj).map((k, idx) => {
      const value = obj[k];
      const isValuePrimitive = JSONToTableUtils.getObjectType(value) === JSONObjectType.Primitive;
      return isValuePrimitive ? (
        <tr key={`__j2t_tr${idx}`}>
          <td>
            <strong>{k}</strong>
          </td>
          <td>{value}</td>
        </tr>
      ) : (
        renderObject(value, k, idx)
      );
    });
  };

  const renderRowHeader = (label: string): JSX.Element => {
    return (
      <div key={`__j2t_rw${label}`}>
        <strong>{label}</strong>
      </div>
    );
  };

  return (
    <div className={'json-to-table'} style={styles} id={id}>
      <table key={`__j2t_root_table`}>
        <tbody key={`__j2t_root_tbody`}>{renderObject(json, undefined, 0)}</tbody>
      </table>
    </div>
  );
};
