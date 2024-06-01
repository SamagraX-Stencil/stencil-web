import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { botConfigObj } from '@repo/configmanager';
import axios from 'axios';

//@ts-ignore
var deepMerge = function deepMerge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  if (!sources.length) return target;
  var source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, _defineProperty({}, key, source[key]));
      }
    }
  }
  return deepMerge.apply(void 0, [target].concat(sources));
};
var isObject = function isObject(item) {
  return item && _typeof(item) === 'object' && !Array.isArray(item);
};
var fetchOverrideConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _deploymentResp$data, deploymentIdConfig, deploymentResp;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          deploymentIdConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: "".concat(process.env.NEXT_PUBLIC_CONFIG_BASE_URL),
            headers: {
              accept: 'application/json'
            }
          };
          _context.next = 4;
          return axios.request(deploymentIdConfig);
        case 4:
          deploymentResp = _context.sent;
          return _context.abrupt("return", deploymentResp === null || deploymentResp === void 0 || (_deploymentResp$data = deploymentResp.data) === null || _deploymentResp$data === void 0 || (_deploymentResp$data = _deploymentResp$data.data) === null || _deploymentResp$data === void 0 ? void 0 : _deploymentResp$data.config);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
        case 11:
          return _context.abrupt("return", {});
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function fetchOverrideConfig() {
    return _ref.apply(this, arguments);
  };
}();
var mergeConfiguration = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var overrideConfig, mergedConfig;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          overrideConfig = {};
          _context2.prev = 1;
          _context2.next = 4;
          return fetchOverrideConfig();
        case 4:
          overrideConfig = _context2.sent;
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          console.error('Error fetching override configuration:', _context2.t0);
          // Optionally handle error, such as falling back to default configs
        case 10:
          _context2.next = 12;
          return deepMerge({}, botConfigObj, overrideConfig);
        case 12:
          mergedConfig = _context2.sent;
          return _context2.abrupt("return", mergedConfig);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function mergeConfiguration() {
    return _ref2.apply(this, arguments);
  };
}();
export default mergeConfiguration;