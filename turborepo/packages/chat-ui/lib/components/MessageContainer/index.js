"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _PullToRefresh = require("../PullToRefresh");
var _Message = require("../Message");
var _BackBottom = require("../BackBottom");
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
var _throttle = _interopRequireDefault(require("../../utils/throttle"));
var _getToBottom = _interopRequireDefault(require("../../utils/getToBottom"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable no-underscore-dangle */

var listenerOpts = (0, _canUse.default)('passiveListener') ? {
  passive: true
} : false;
function isNearBottom(el, n) {
  var offsetHeight = Math.max(el.offsetHeight, 600);
  return (0, _getToBottom.default)(el) < offsetHeight * n;
}
var MessageContainer = exports.MessageContainer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var messages = props.messages,
    loadMoreText = props.loadMoreText,
    onRefresh = props.onRefresh,
    onScroll = props.onScroll,
    renderBeforeMessageList = props.renderBeforeMessageList,
    renderMessageContent = props.renderMessageContent,
    onBackBottomShow = props.onBackBottomShow,
    onBackBottomClick = props.onBackBottomClick;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    showBackBottom = _useState2[0],
    setShowBackBottom = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    newCount = _useState4[0],
    setNewCount = _useState4[1];
  var showBackBottomtRef = (0, _react.useRef)(showBackBottom);
  var newCountRef = (0, _react.useRef)(newCount);
  var messagesRef = (0, _react.useRef)(null);
  var scrollerRef = (0, _react.useRef)(null);
  var lastMessage = messages[messages.length - 1];
  var clearBackBottom = function clearBackBottom() {
    setNewCount(0);
    setShowBackBottom(false);
  };
  var scrollToEnd = (0, _react.useCallback)(function (opts) {
    if (scrollerRef.current) {
      if (!showBackBottomtRef.current || opts && opts.force) {
        scrollerRef.current.scrollToEnd(opts);
        if (showBackBottomtRef.current) {
          clearBackBottom();
        }
      }
    }
  }, []);
  var handleBackBottomClick = function handleBackBottomClick() {
    scrollToEnd({
      animated: false,
      force: true
    });
    // setNewCount(0);
    // setShowBackBottom(false);

    if (onBackBottomClick) {
      onBackBottomClick();
    }
  };
  var checkShowBottomRef = (0, _react.useRef)((0, _throttle.default)(function (el) {
    if (isNearBottom(el, 3)) {
      if (newCountRef.current) {
        // 如果有新消息，离底部0.5屏-隐藏提示
        if (isNearBottom(el, 0.5)) {
          // setNewCount(0);
          // setShowBackBottom(false);
          clearBackBottom();
        }
      } else {
        setShowBackBottom(false);
      }
    } else {
      // 3屏+显示回到底部
      setShowBackBottom(true);
    }
  }));
  var handleScroll = function handleScroll(e) {
    checkShowBottomRef.current(e.target);
    if (onScroll) {
      onScroll(e);
    }
  };
  (0, _react.useEffect)(function () {
    newCountRef.current = newCount;
  }, [newCount]);
  (0, _react.useEffect)(function () {
    showBackBottomtRef.current = showBackBottom;
  }, [showBackBottom]);
  (0, _react.useEffect)(function () {
    var scroller = scrollerRef.current;
    var wrapper = scroller && scroller.wrapperRef.current;
    if (!wrapper || !lastMessage || lastMessage.position === 'pop') {
      return;
    }
    if (lastMessage.position === 'right') {
      // 自己发的消息，强制滚动到底部
      scrollToEnd({
        force: true
      });
    } else if (isNearBottom(wrapper, 2)) {
      var animated = !!wrapper.scrollTop;
      scrollToEnd({
        animated: animated,
        force: true
      });
    } else {
      setNewCount(function (c) {
        return c + 1;
      });
      setShowBackBottom(true);
    }
  }, [lastMessage, scrollToEnd]);
  (0, _react.useEffect)(function () {
    var wrapper = messagesRef.current;
    var needBlur = false;
    var startY = 0;
    function reset() {
      needBlur = false;
      startY = 0;
    }
    function touchStart(e) {
      var _document = document,
        activeElement = _document.activeElement;
      if (activeElement && activeElement.nodeName === 'TEXTAREA') {
        needBlur = true;
        startY = e.touches[0].clientY;
      }
    }
    function touchMove(e) {
      if (needBlur && Math.abs(e.touches[0].clientY - startY) > 20) {
        document.activeElement.blur();
        reset();
      }
    }
    wrapper.addEventListener('touchstart', touchStart, listenerOpts);
    wrapper.addEventListener('touchmove', touchMove, listenerOpts);
    wrapper.addEventListener('touchend', reset);
    wrapper.addEventListener('touchcancel', reset);
    return function () {
      wrapper.removeEventListener('touchstart', touchStart);
      wrapper.removeEventListener('touchmove', touchMove);
      wrapper.removeEventListener('touchend', reset);
      wrapper.removeEventListener('touchcancel', reset);
    };
  }, []);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      ref: messagesRef,
      scrollToEnd: scrollToEnd
    };
  }, [scrollToEnd]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "MessageContainer",
    ref: messagesRef,
    tabIndex: -1
  }, renderBeforeMessageList && renderBeforeMessageList(), /*#__PURE__*/_react.default.createElement(_PullToRefresh.PullToRefresh, {
    onRefresh: onRefresh,
    onScroll: handleScroll,
    loadMoreText: loadMoreText,
    ref: scrollerRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "MessageList"
  }, messages.map(function (msg) {
    return /*#__PURE__*/_react.default.createElement(_Message.Message, (0, _extends2.default)({}, msg, {
      renderMessageContent: renderMessageContent,
      key: msg._id
    }));
  }))), showBackBottom && /*#__PURE__*/_react.default.createElement(_BackBottom.BackBottom, {
    count: newCount,
    onClick: handleBackBottomClick,
    onDidMount: onBackBottomShow
  }));
});