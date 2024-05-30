"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.JSONObjectType = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
/* eslint-disable @typescript-eslint/no-explicit-any */
var JSONObjectType = exports.JSONObjectType = /*#__PURE__*/function (JSONObjectType) {
  JSONObjectType[JSONObjectType["Array"] = 0] = "Array";
  JSONObjectType[JSONObjectType["ObjectWithNonNumericKeys"] = 1] = "ObjectWithNonNumericKeys";
  JSONObjectType[JSONObjectType["Object"] = 2] = "Object";
  JSONObjectType[JSONObjectType["Primitive"] = 3] = "Primitive";
  return JSONObjectType;
}({});
var JsonToTableUtils = exports.default = /*#__PURE__*/function () {
  function JsonToTableUtils() {
    (0, _classCallCheck2.default)(this, JsonToTableUtils);
  }
  return (0, _createClass2.default)(JsonToTableUtils, null, [{
    key: "getObjectType",
    value:
    /**
     * Get object type
     */
    function getObjectType(obj) {
      if (obj !== null && (0, _typeof2.default)(obj) === "object") {
        if (Array.isArray(obj)) {
          return JSONObjectType.Array;
        } else {
          if (Object.keys(obj).length) {
            return JSONObjectType.ObjectWithNonNumericKeys;
          } else {
            return JSONObjectType.Object;
          }
        }
      } else {
        return JSONObjectType.Primitive;
      }
    }
  }, {
    key: "checkLabelTypes",
    value: function checkLabelTypes(labels) {
      var reduced = labels.reduce(function (accumulator, value) {
        return accumulator + (isNaN(Number(value)) ? value : Number(value));
      }, 0);
      return typeof reduced === "number" ? "number" : "string";
    }
  }, {
    key: "getUniqueObjectKeys",
    value: function getUniqueObjectKeys(anArray) {
      var labels = [];
      var objectType = JSONObjectType.Object;
      anArray.forEach(function (item) {
        labels = labels.concat(Object.keys(item)).filter(function (elem, pos, arr) {
          return arr.indexOf(elem) === pos;
        });
      });
      return {
        labels: labels,
        type: objectType
      };
    }
  }]);
}();