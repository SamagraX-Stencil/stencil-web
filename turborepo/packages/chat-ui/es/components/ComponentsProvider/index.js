import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { useEffect } from 'react';
import { lazyComponent } from '../../utils/lazyComponent';
import { LazyComponentWithCode } from '../LazyComponent';
import { ComponentsContext } from './ComponentsContext';
export { useComponents } from './useComponents';
export var ComponentsProvider = function ComponentsProvider(props) {
  var components = props.components,
    children = props.children;
  var componentsRef = React.useRef(_objectSpread({}, components));
  useEffect(function () {
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
        return /*#__PURE__*/React.createElement(LazyComponentWithCode, _extends({
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
      var _component = lazyComponent(comp.url, comp.name, function () {
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
  return /*#__PURE__*/React.createElement(ComponentsContext.Provider, {
    value: {
      addComponent: addComponent,
      hasComponent: hasComponent,
      getComponent: getComponent
    }
  }, children);
};