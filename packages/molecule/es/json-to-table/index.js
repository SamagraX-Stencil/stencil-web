import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import JSONToTableUtils, { JSONObjectType } from './utils';
import './style.css';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export var JsonToTable = function JsonToTable(_ref) {
  var json = _ref.json,
    id = _ref.id,
    styles = _ref.styles;
  var renderObject = function renderObject(obj, header, idx) {
    var phrase = [];
    if (header) {
      phrase.push(renderRowHeader(header));
    }
    var objType = JSONToTableUtils.getObjectType(obj);
    var tmp;
    switch (objType) {
      case JSONObjectType.ObjectWithNonNumericKeys:
        tmp = header ? /*#__PURE__*/_jsx("table", {
          children: /*#__PURE__*/_jsx("tbody", {
            children: renderRows(obj)
          }, "__j2t_bObj".concat(idx))
        }, "__j2t_tableObj".concat(idx)) : renderRows(obj);
        break;
      case JSONObjectType.Array:
        tmp = header ? /*#__PURE__*/_jsx("table", {
          children: /*#__PURE__*/_jsx("tbody", {
            children: parseArray(obj)
          }, "__j2t_bArr".concat(idx))
        }, "__j2t_tableArr".concat(idx)) : parseArray(obj);
        break;
      default:
        tmp = /*#__PURE__*/_jsx(_Fragment, {});
      // Handle other cases or default to an empty fragment
    }
    phrase.push(tmp);
    return header ? /*#__PURE__*/_jsx("tr", {
      children: renderCell({
        content: phrase,
        colspan: 2
      })
    }, "__j2t_trObj".concat(idx)) : phrase;
  };
  var getCellValue = function getCellValue(content) {
    return content === true || content === false ? content.toString() : content;
  };
  var renderCell = function renderCell(_ref2) {
    var content = _ref2.content,
      _ref2$colspan = _ref2.colspan,
      colspan = _ref2$colspan === void 0 ? 1 : _ref2$colspan,
      _ref2$isHeader = _ref2.isHeader,
      isHeader = _ref2$isHeader === void 0 ? false : _ref2$isHeader;
    var valueDisplay = isHeader ? /*#__PURE__*/_jsx("strong", {
      children: getCellValue(content)
    }) : getCellValue(content);
    return /*#__PURE__*/_jsx("td", {
      colSpan: colspan,
      children: valueDisplay
    }, "__j2t_td".concat(content));
  };
  var renderHeader = function renderHeader(labels) {
    return /*#__PURE__*/_jsx("tr", {
      children: labels.map(function (v, index) {
        return renderCell({
          content: v,
          key: "header-".concat(index)
        });
      })
    }, "__j2t_trHeader");
  };
  var renderValues = function renderValues(values) {
    return /*#__PURE__*/_jsx("tr", {
      children: values.map(function (k, index) {
        return renderCell({
          content: k,
          key: "value-".concat(index)
        });
      })
    }, "__j2t_trArrString");
  };
  var renderRowValues = function renderRowValues(anArray, labels) {
    return anArray.map(function (item, idx) {
      return /*#__PURE__*/_jsx("tr", {
        children: labels.map(function (k, index) {
          var isValuePrimitive = JSONToTableUtils.getObjectType(item[k]) === JSONObjectType.Primitive;
          return isValuePrimitive ? renderCell({
            content: item[k],
            key: "item-".concat(idx, "-").concat(index)
          }) : renderObject(item[k], k, idx);
        })
      }, "__j2t_Arr".concat(idx));
    });
  };
  var parseArray = function parseArray(anArray) {
    var phrase = [];
    var labels = JSONToTableUtils.getUniqueObjectKeys(anArray);
    if (JSONToTableUtils.checkLabelTypes(labels.labels) !== 'number') {
      phrase.push(renderHeader(labels.labels));
      phrase.push.apply(phrase, _toConsumableArray(renderRowValues(anArray, labels.labels)));
    } else {
      phrase.push(renderValues(anArray));
    }
    return phrase;
  };
  var renderRows = function renderRows(obj) {
    return Object.keys(obj).map(function (k, idx) {
      var value = obj[k];
      var isValuePrimitive = JSONToTableUtils.getObjectType(value) === JSONObjectType.Primitive;
      return isValuePrimitive ? /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          children: /*#__PURE__*/_jsx("strong", {
            children: k
          })
        }), /*#__PURE__*/_jsx("td", {
          children: value
        })]
      }, "__j2t_tr".concat(idx)) : renderObject(value, k, idx);
    });
  };
  var renderRowHeader = function renderRowHeader(label) {
    return /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx("strong", {
        children: label
      })
    }, "__j2t_rw".concat(label));
  };
  return /*#__PURE__*/_jsx("div", {
    className: 'json-to-table',
    style: styles,
    id: id,
    children: /*#__PURE__*/_jsx("table", {
      children: /*#__PURE__*/_jsx("tbody", {
        children: renderObject(json, undefined, 0)
      }, "__j2t_root_tbody")
    }, "__j2t_root_table")
  });
};