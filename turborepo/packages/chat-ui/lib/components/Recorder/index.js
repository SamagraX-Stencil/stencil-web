"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recorder = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Flex = require("../Flex");
var _Icon = require("../Icon");
var _LocaleProvider = require("../LocaleProvider");
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var canPassive = (0, _canUse.default)('passiveListener');
var listenerOpts = canPassive ? {
  passive: true
} : false;
var listenerOptsWithoutPassive = canPassive ? {
  passive: false
} : false;
var MOVE_INTERVAL = 80;
var btnTextMap = {
  inited: 'hold2talk',
  recording: 'release2send',
  willCancel: 'release2send'
};
var ts = 0;
var startY = 0;
var Recorder = exports.Recorder = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var volume = props.volume,
    onStart = props.onStart,
    onEnd = props.onEnd,
    onCancel = props.onCancel;
  var _useState = (0, _react.useState)('inited'),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    status = _useState2[0],
    setStatus = _useState2[1];
  var btnRef = (0, _react.useRef)(null);
  var _useLocale = (0, _LocaleProvider.useLocale)('Recorder'),
    trans = _useLocale.trans;
  var doEnd = (0, _react.useCallback)(function () {
    var duration = Date.now() - ts;
    if (onEnd) {
      onEnd({
        duration: duration
      });
    }
  }, [onEnd]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      stop: function stop() {
        setStatus('inited');
        doEnd();
        ts = 0;
      }
    };
  });
  (0, _react.useEffect)(function () {
    var wrapper = btnRef.current;
    function handleTouchStart(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      var touch0 = e.touches[0];
      startY = touch0.pageY;
      ts = Date.now();
      setStatus('recording');
      if (onStart) {
        onStart();
      }
    }
    function handleTouchMove(e) {
      if (!ts) return;
      var nowY = e.touches[0].pageY;
      var isCancel = startY - nowY > MOVE_INTERVAL;
      setStatus(isCancel ? 'willCancel' : 'recording');
    }
    function handleTouchEnd(e) {
      if (!ts) return;
      var endY = e.changedTouches[0].pageY;
      var isRecording = startY - endY < MOVE_INTERVAL;
      setStatus('inited');
      if (isRecording) {
        doEnd();
      } else if (onCancel) {
        onCancel();
      }
    }
    wrapper.addEventListener('touchstart', handleTouchStart, listenerOptsWithoutPassive);
    wrapper.addEventListener('touchmove', handleTouchMove, listenerOpts);
    wrapper.addEventListener('touchend', handleTouchEnd);
    wrapper.addEventListener('touchcancel', handleTouchEnd);
    return function () {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      wrapper.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [doEnd, onCancel, onStart]);
  var isCancel = status === 'willCancel';
  var wavesStyle = {
    transform: "scale(".concat((volume || 1) / 100 + 1, ")")
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Recorder', {
      'Recorder--cancel': isCancel
    }),
    ref: btnRef
  }, status !== 'inited' && /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "RecorderToast",
    direction: "column",
    center: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "RecorderToast-waves",
    hidden: status !== 'recording',
    style: wavesStyle
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "RecorderToast-wave-1",
    type: "hexagon"
  }), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "RecorderToast-wave-2",
    type: "hexagon"
  }), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "RecorderToast-wave-3",
    type: "hexagon"
  })), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "RecorderToast-icon",
    type: isCancel ? 'cancel' : 'mic'
  }), /*#__PURE__*/_react.default.createElement("span", null, trans(isCancel ? 'release2cancel' : 'releaseOrSwipe'))), /*#__PURE__*/_react.default.createElement("div", {
    className: "Recorder-btn",
    role: "button",
    "aria-label": trans('hold2talk')
  }, /*#__PURE__*/_react.default.createElement("span", null, trans(btnTextMap[status]))));
});