/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import JSONToTableUtils, { JSONObjectType, JSONObjectKeys } from './utils';
import css from './index.module.css'
import { capitalize } from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
interface IJsonToTableProps {
  id?: string;
  json: any; // Consider specifying a more detailed type depending on your JSON structure
  styles?: React.CSSProperties;
}

export const JsonToTable: React.FC<IJsonToTableProps> = ({ json, id, styles }) => {
  const renderObject = (obj: any, header: string | undefined, idx: number): JSX.Element | JSX.Element[] => {
    const phrase: any = [];
    if (header) {
      phrase.push(renderRowHeader(header));
    }

    const objType: JSONObjectType = JSONToTableUtils.getObjectType(obj);
    let tmp: JSX.Element | JSX.Element[];

    switch (objType) {
      case JSONObjectType.ObjectWithNonNumericKeys:
        tmp = header ? (
          <Table key={`__j2t_TableObj${idx}`}>
            <TableBody key={`__j2t_bObj${idx}`}>{renderRows(obj)}</TableBody>
          </Table>
        ) : (
          renderRows(obj)
        );
        break;
      case JSONObjectType.Array:
        tmp = header ? (
          <Table key={`__j2t_TableArr${idx}`}>
            <TableBody key={`__j2t_bArr${idx}`}>{parseArray(obj)}</TableBody>
          </Table>
        ) : (
          parseArray(obj)
        );
        break;
      default:
        tmp = <></>; // Handle other cases or default to an empty fragment
    }

    phrase.push(tmp);
    return header ? (
      <TableRow key={`__j2t_trObj${idx}`}>{renderCell({ content: phrase, colspan: 2 })}</TableRow>
    ) : (
      phrase
    );
  };

  const getCellValue = (content: any): string => {
    return content === true || content === false ? content.toString() : content;
  };

  const renderCell = ({ content, colspan = 1, isHeader = false }: {
    content: any;
    colspan?: number;
    isHeader?: boolean;
    key?:any
  }): JSX.Element => {
    const valueDisplay = isHeader ? <strong>{getCellValue(content)}</strong> : getCellValue(content);
    //@ts-ignore
    return <TableCell colSpan={colspan} key={`__j2t_td${content}`}>{capitalize(valueDisplay) }</TableCell>;
  };

  const renderHeader = (labels: string[]): JSX.Element => {
    return (
      <TableRow key={`__j2t_trHeader`}>
        {labels.map((v, index) => renderCell({ content: v, key: `header-${index}` }))}
      </TableRow>
    );
  };

  const renderValues = (values: any[]): JSX.Element => {
    return (
      <TableRow key={`__j2t_trArrString`}>
        {values.map((k, index) => renderCell({ content: k, key: `value-${index}` }))}
      </TableRow>
    );
  };

  const renderRowValues = (anArray: any[], labels: string[]): JSX.Element[] => {
    return anArray.map((item, idx) => {
      return (
        <TableRow key={`__j2t_Arr${idx}`}>
          {labels.map((k, index) => {
            const isValuePrimitive = JSONToTableUtils.getObjectType(item[k]) === JSONObjectType.Primitive;
            return isValuePrimitive ? renderCell({ content: item[k], key: `item-${idx}-${index}` }) : renderObject(item[k], k, idx);
          })}
        </TableRow>
      );
    });
  };

  const parseArray = (anArray: any[]): JSX.Element[] => {
    const phrase: JSX.Element[] = [];
    const labels: JSONObjectKeys = JSONToTableUtils.getUniqueObjectKeys(anArray);
    if (JSONToTableUtils.checkLabelTypes(labels.labels) !== "number") {
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
        <TableRow key={`__j2t_tr${idx}`}>
          <TableCell><strong>{k}</strong></TableCell>
          <TableCell>{capitalize(value)}</TableCell>
        </TableRow>
      ) : renderObject(value, k, idx);
    });
  };

  const renderRowHeader = (label: string): JSX.Element => {
    return <div key={`__j2t_rw${label}`}><strong>{capitalize(label) }</strong></div>;
  };

  return (
    <div className={css.jsonToTable} style={styles} id={id}>
      <TableContainer>
      <Table stickyHeader key={`__j2t_root_Table`} size="small">
        <TableBody key={`__j2t_root_tbody`}>{renderObject(json, undefined, 0)}</TableBody>
      </Table>
      </TableContainer>
    </div>
  );
};

