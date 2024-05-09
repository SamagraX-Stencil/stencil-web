import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-disable no-underscore-dangle */
import { useState, useMemo, useRef, useCallback } from 'react';
import { getRandomString } from '../utils';
var TIME_GAP = 5 * 60 * 1000;
var lastTs = 0;
var makeMsg = function makeMsg(msg, id) {
  var ts = msg.createdAt || Date.now();
  var hasTime = msg.hasTime || ts - lastTs > TIME_GAP;
  if (hasTime) {
    lastTs = ts;
  }
  return _objectSpread(_objectSpread({}, msg), {}, {
    _id: msg._id || id || getRandomString(),
    createdAt: ts,
    position: msg.position || 'left',
    hasTime: hasTime
  });
};
var TYPING_ID = '_TYPING_';
export default function useMessages() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initialMsgs = useMemo(function () {
    return initialState.map(function (t) {
      return makeMsg(t);
    });
  }, [initialState]);
  var _useState = useState(initialMsgs),
    _useState2 = _slicedToArray(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var isTypingRef = useRef(false);
  var prependMsgs = useCallback(function (msgs) {
    setMessages(function (prev) {
      return [].concat(_toConsumableArray(msgs), _toConsumableArray(prev));
    });
  }, []);
  var updateMsg = useCallback(function (id, msg) {
    setMessages(function (prev) {
      return prev.map(function (t) {
        return t._id === id ? makeMsg(msg, id) : t;
      });
    });
  }, []);
  var appendMsg = useCallback(function (msg) {
    var newMsg = makeMsg(msg);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      updateMsg(TYPING_ID, newMsg);
    } else {
      setMessages(function (prev) {
        return [].concat(_toConsumableArray(prev), [newMsg]);
      });
    }
  }, [updateMsg]);
  var deleteMsg = useCallback(function (id) {
    setMessages(function (prev) {
      return prev.filter(function (t) {
        return t._id !== id;
      });
    });
  }, []);
  var resetList = useCallback(function () {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    setMessages(list);
  }, []);
  var setTyping = useCallback(function (typing) {
    if (typing === isTypingRef.current) return;
    if (typing) {
      appendMsg({
        _id: TYPING_ID,
        type: 'typing'
      });
    } else {
      deleteMsg(TYPING_ID);
    }
    isTypingRef.current = typing;
  }, [appendMsg, deleteMsg]);
  return {
    messages: messages,
    prependMsgs: prependMsgs,
    appendMsg: appendMsg,
    updateMsg: updateMsg,
    deleteMsg: deleteMsg,
    resetList: resetList,
    setTyping: setTyping
  };
}