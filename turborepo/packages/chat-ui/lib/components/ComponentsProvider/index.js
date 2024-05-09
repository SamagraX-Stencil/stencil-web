"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentsProvider = void 0;
Object.defineProperty(exports, "useComponents", {
  enumerable: true,
  get: function get() {
    return _useComponents.useComponents;
  }
});
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _lazyComponent = require("../../utils/lazyComponent");
var _LazyComponent = require("../LazyComponent");
var _ComponentsContext = require("./ComponentsContext");
var _useComponents = require("./useComponents");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ComponentsProvider = exports.ComponentsProvider = function ComponentsProvider(props) {
  var components = props.components,
    children = props.children;
  var componentsRef = _react.default.useRef(_objectSpread({}, components));
  (0, _react.useEffect)(function () {
    componentsRef.current = _objectSpread(_objectSpread({}, components), componentsRef.current);
  }, [components]);
  function addComponent(code, val) {
    componentsRef.current[code] = val;
  }
  function hasComponent(code) {
    return componentsRef.current.hasOwnProperty(code);
  }
  function getComponent(code) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var comp = componentsRef.current[code];

    // no component
    if (!comp) {
      callback({
        code: code,
        errCode: 'NO_CODE'
      });
      return null;
    }
    if ('component' in comp) {
      if (comp.type !== 'decorator') {
        callback({
          code: code,
          async: false,
          component: comp.component
        });
      }
      return comp.component;
    }
    if ('decorator' in comp) {
      var component = function component(compProps) {
        return /*#__PURE__*/_react.default.createElement(_LazyComponent.LazyComponentWithCode, (0, _extends2.default)({
          code: comp.decorator,
          decoratorData: comp.data,
          onLoad: callback
        }, compProps));
      };
      componentsRef.current[code] = {
        component: component,
        type: 'decorator'
      };
      return component;
    }
    if ('url' in comp) {
      var _component = (0, _lazyComponent.lazyComponent)(comp.url, comp.name, function () {
        componentsRef.current[code] = {
          component: _component
        };
        callback({
          code: code,
          async: true,
          component: _component
        });
      }, function () {
        callback({
          code: code,
          errCode: 'ERR_IMPORT_SCRIPT'
        });
      });
      return _component;
    }
    callback({
      code: code,
      errCode: 'NO_HANDLER'
    });
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_ComponentsContext.ComponentsContext.Provider, {
    value: {
      addComponent: addComponent,
      hasComponent: hasComponent,
      getComponent: getComponent
    }
  }, children);
};