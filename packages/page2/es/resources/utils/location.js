import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
export function recordUserLocation() {
  return _recordUserLocation.apply(this, arguments);
}
function _recordUserLocation() {
  _recordUserLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _apiRes, apiRes;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveUserLocation);
          }
          _context2.next = 4;
          return fetch('https://api.ipify.org?format=json');
        case 4:
          apiRes = _context2.sent;
          _context2.next = 7;
          return apiRes.json();
        case 7:
          apiRes = _context2.sent;
          if ((_apiRes = apiRes) !== null && _apiRes !== void 0 && _apiRes.ip) {
            navigator.permissions.query({
              name: 'geolocation'
            }).then( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
                var _apiRes2;
                var locationRes;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return fetch("https://geoip.samagra.io/city/".concat(apiRes.ip));
                    case 2:
                      locationRes = _context.sent;
                      _context.next = 5;
                      return locationRes.json();
                    case 5:
                      locationRes = _context.sent;
                      sessionStorage.setItem('city', locationRes.city);
                      sessionStorage.setItem('state', locationRes.regionName);
                      sessionStorage.setItem('ip', (_apiRes2 = apiRes) === null || _apiRes2 === void 0 ? void 0 : _apiRes2.ip);
                      if (res.state != 'granted') {
                        sessionStorage.setItem('latitude', locationRes.lat);
                        sessionStorage.setItem('longitude', locationRes.lon);
                      }
                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
          }
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _recordUserLocation.apply(this, arguments);
}
function saveUserLocation(position) {
  sessionStorage.setItem('latitude', position.coords.latitude);
  sessionStorage.setItem('longitude', position.coords.longitude);
}