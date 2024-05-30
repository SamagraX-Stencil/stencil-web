"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonToTable = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _utils = _interopRequireWildcard(require("./utils"));
require("./style.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable @typescript-eslint/no-explicit-any */

var JsonToTable = exports.JsonToTable = function JsonToTable(_ref) {
  var json = _ref.json,
    id = _ref.id,
    styles = _ref.styles;
  var renderObject = function renderObject(obj, header, idx) {
    var phrase = [];
    if (header) {
      phrase.push(renderRowHeader(header));
    }
    var objType = _utils.default.getObjectType(obj);
    var tmp;
    switch (objType) {
      case _utils.JSONObjectType.ObjectWithNonNumericKeys:
        tmp = header ? /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
            children: renderRows(obj)
          }, "__j2t_bObj".concat(idx))
        }, "__j2t_tableObj".concat(idx)) : renderRows(obj);
        break;
      case _utils.JSONObjectType.Array:
        tmp = header ? /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
            children: parseArray(obj)
          }, "__j2t_bArr".concat(idx))
        }, "__j2t_tableArr".concat(idx)) : parseArray(obj);
        break;
      default:
        tmp = /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {});
      // Handle other cases or default to an empty fragment
    }
    phrase.push(tmp);
    return header ? /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
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
    var valueDisplay = isHeader ? /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
      children: getCellValue(content)
    }) : getCellValue(content);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: colspan,
      children: valueDisplay
    }, "__j2t_td".concat(content));
  };
  var renderHeader = function renderHeader(labels) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: labels.map(function (v, index) {
        return renderCell({
          content: v,
          key: "header-".concat(index)
        });
      })
    }, "__j2t_trHeader");
  };
  var renderValues = function renderValues(values) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
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
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        children: labels.map(function (k, index) {
          var isValuePrimitive = _utils.default.getObjectType(item[k]) === _utils.JSONObjectType.Primitive;
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
    var labels = _utils.default.getUniqueObjectKeys(anArray);
    if (_utils.default.checkLabelTypes(labels.labels) !== 'number') {
      phrase.push(renderHeader(labels.labels));
      phrase.push.apply(phrase, (0, _toConsumableArray2.default)(renderRowValues(anArray, labels.labels)));
    } else {
      phrase.push(renderValues(anArray));
    }
    return phrase;
  };
  var renderRows = function renderRows(obj) {
    return Object.keys(obj).map(function (k, idx) {
      var value = obj[k];
      var isValuePrimitive = _utils.default.getObjectType(value) === _utils.JSONObjectType.Primitive;
      return isValuePrimitive ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
            children: k
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          children: value
        })]
      }, "__j2t_tr".concat(idx)) : renderObject(value, k, idx);
    });
  };
  var renderRowHeader = function renderRowHeader(label) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
        children: label
      })
    }, "__j2t_rw".concat(label));
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: 'json-to-table',
    style: styles,
    id: id,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: renderObject(json, undefined, 0)
      }, "__j2t_root_tbody")
    }, "__j2t_root_table")
  });
};