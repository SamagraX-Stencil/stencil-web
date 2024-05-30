import _typeof from "@babel/runtime/helpers/esm/typeof";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
/* eslint-disable @typescript-eslint/no-explicit-any */
export var JSONObjectType = /*#__PURE__*/function (JSONObjectType) {
  JSONObjectType[JSONObjectType["Array"] = 0] = "Array";
  JSONObjectType[JSONObjectType["ObjectWithNonNumericKeys"] = 1] = "ObjectWithNonNumericKeys";
  JSONObjectType[JSONObjectType["Object"] = 2] = "Object";
  JSONObjectType[JSONObjectType["Primitive"] = 3] = "Primitive";
  return JSONObjectType;
}({});
var JsonToTableUtils = /*#__PURE__*/function () {
  function JsonToTableUtils() {
    _classCallCheck(this, JsonToTableUtils);
  }
  return _createClass(JsonToTableUtils, null, [{
    key: "getObjectType",
    value:
    /**
     * Get object type
     */
    function getObjectType(obj) {
      if (obj !== null && _typeof(obj) === "object") {
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
export { JsonToTableUtils as default };