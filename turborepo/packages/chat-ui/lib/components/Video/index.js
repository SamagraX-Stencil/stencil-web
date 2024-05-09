"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Video = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "src", "cover", "duration", "onClick", "onCoverLoad", "style", "videoRef", "children"];
/* eslint-disable jsx-a11y/media-has-caption */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Video = exports.Video = function Video(props) {
  var className = props.className,
    src = props.src,
    cover = props.cover,
    duration = props.duration,
    onClick = props.onClick,
    onCoverLoad = props.onCoverLoad,
    style = props.style,
    outerVideoRef = props.videoRef,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var localVideoRef = (0, _react.useRef)(null);
  var videoRef = outerVideoRef || localVideoRef;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isPlayed = _useState2[0],
    setIsPlayed = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    paused = _useState4[0],
    setPaused = _useState4[1];
  function handleClick(e) {
    setIsPlayed(true);
    var video = videoRef.current;
    if (video) {
      if (video.ended || video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    if (onClick) {
      onClick(paused, e);
    }
  }
  function handlePlay() {
    setPaused(false);
  }
  function handlePause() {
    setPaused(true);
  }
  var hasCover = !isPlayed && !!cover;
  var hasDuration = hasCover && !!duration;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Video', "Video--".concat(paused ? 'paused' : 'playing'), className),
    style: style
  }, hasCover && /*#__PURE__*/_react.default.createElement("img", {
    className: "Video-cover",
    src: cover,
    onLoad: onCoverLoad,
    alt: ""
  }), hasDuration && /*#__PURE__*/_react.default.createElement("span", {
    className: "Video-duration"
  }, duration), /*#__PURE__*/_react.default.createElement("video", (0, _extends2.default)({
    className: "Video-video",
    src: src,
    ref: videoRef,
    hidden: hasCover,
    controls: true,
    onPlay: handlePlay,
    onPause: handlePause,
    onEnded: handlePause
  }, other), children), hasCover && /*#__PURE__*/_react.default.createElement("button", {
    className: (0, _clsx.default)('Video-playBtn', {
      paused: paused
    }),
    type: "button",
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "Video-playIcon"
  })));
};