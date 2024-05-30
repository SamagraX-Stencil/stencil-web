"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordUserLocation = recordUserLocation;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function recordUserLocation() {
  return _recordUserLocation.apply(this, arguments);
}
function _recordUserLocation() {
  _recordUserLocation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var lat, long, saveUserLocation, _saveUserLocation, apiRes;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _saveUserLocation = function _saveUserLocation3() {
            _saveUserLocation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(position) {
              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    // Capturing user location through GPS
                    sessionStorage.setItem('latitude', position.coords.latitude);
                    sessionStorage.setItem('longitude', position.coords.longitude);
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _saveUserLocation.apply(this, arguments);
          };
          saveUserLocation = function _saveUserLocation2(_x) {
            return _saveUserLocation.apply(this, arguments);
          };
          lat = 0, long = 0;
          _context3.prev = 3;
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveUserLocation);
          }

          // Fetching user's ip
          _context3.next = 7;
          return fetch('https://api.ipify.org?format=json');
        case 7:
          apiRes = _context3.sent;
          _context3.next = 10;
          return apiRes.json();
        case 10:
          apiRes = _context3.sent;
          navigator.permissions.query({
            name: 'geolocation'
          }).then( /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {
              var _apiRes, _locationRes, _locationRes2, _latLongRes, _latLongRes2, _latLongRes3, _latLongRes4, _apiRes2, locationRes, latLongRes, _locationRes4, _locationRes5, _locationRes6, _locationRes7, _apiRes3, _locationRes3;
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!(res.state != 'granted')) {
                      _context.next = 24;
                      break;
                    }
                    if (!((_apiRes = apiRes) !== null && _apiRes !== void 0 && _apiRes.ip)) {
                      _context.next = 22;
                      break;
                    }
                    _context.next = 4;
                    return fetch("https://geoip.samagra.io/city/".concat(apiRes.ip));
                  case 4:
                    locationRes = _context.sent;
                    _context.next = 7;
                    return locationRes.json();
                  case 7:
                    locationRes = _context.sent;
                    _context.next = 10;
                    return fetch("https://geoip.samagra.io/georev?lat=".concat((_locationRes = locationRes) === null || _locationRes === void 0 ? void 0 : _locationRes.lat, "&lon=").concat((_locationRes2 = locationRes) === null || _locationRes2 === void 0 ? void 0 : _locationRes2.lon));
                  case 10:
                    latLongRes = _context.sent;
                    _context.next = 13;
                    return latLongRes.json();
                  case 13:
                    latLongRes = _context.sent;
                    sessionStorage.setItem('city', (_latLongRes = latLongRes) === null || _latLongRes === void 0 ? void 0 : _latLongRes.district);
                    sessionStorage.setItem('state', (_latLongRes2 = latLongRes) === null || _latLongRes2 === void 0 ? void 0 : _latLongRes2.state);
                    sessionStorage.setItem('subDistrict', (_latLongRes3 = latLongRes) === null || _latLongRes3 === void 0 ? void 0 : _latLongRes3.subDistrict);
                    sessionStorage.setItem('village', ((_latLongRes4 = latLongRes) === null || _latLongRes4 === void 0 ? void 0 : _latLongRes4.village) || '');
                    sessionStorage.setItem('ip', (_apiRes2 = apiRes) === null || _apiRes2 === void 0 ? void 0 : _apiRes2.ip);
                    sessionStorage.setItem('latitude', locationRes.lat);
                    sessionStorage.setItem('longitude', locationRes.lon);
                    sessionStorage.setItem('captureMode', 'ip');
                  case 22:
                    _context.next = 36;
                    break;
                  case 24:
                    _context.next = 26;
                    return fetch("https://geoip.samagra.io/georev?lat=".concat(lat || sessionStorage.getItem('latitude'), "&lon=").concat(long || sessionStorage.getItem('longitude')));
                  case 26:
                    _locationRes3 = _context.sent;
                    _context.next = 29;
                    return _locationRes3.json();
                  case 29:
                    _locationRes3 = _context.sent;
                    sessionStorage.setItem('city', (_locationRes4 = _locationRes3) === null || _locationRes4 === void 0 ? void 0 : _locationRes4.district);
                    sessionStorage.setItem('state', (_locationRes5 = _locationRes3) === null || _locationRes5 === void 0 ? void 0 : _locationRes5.state);
                    sessionStorage.setItem('subDistrict', (_locationRes6 = _locationRes3) === null || _locationRes6 === void 0 ? void 0 : _locationRes6.subDistrict);
                    sessionStorage.setItem('village', ((_locationRes7 = _locationRes3) === null || _locationRes7 === void 0 ? void 0 : _locationRes7.village) || '');
                    sessionStorage.setItem('ip', (_apiRes3 = apiRes) === null || _apiRes3 === void 0 ? void 0 : _apiRes3.ip);
                    sessionStorage.setItem('captureMode', 'gps');
                  case 36:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref.apply(this, arguments);
            };
          }());
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](3);
          console.log(_context3.t0);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 14]]);
  }));
  return _recordUserLocation.apply(this, arguments);
}