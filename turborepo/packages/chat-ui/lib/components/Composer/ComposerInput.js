"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposerInput = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Input = require("../Input");
var _SendConfirm = require("../SendConfirm");
var _riseInput = _interopRequireDefault(require("./riseInput"));
var _parseDataTransfer = _interopRequireDefault(require("../../utils/parseDataTransfer"));
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
var _excluded = ["inputRef", "invisible", "onImageSend", "disabled", "showTransliteration", "transliterationConfig", "value", "onChange", "cursorPosition", "setCursorPosition"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var canTouch = (0, _canUse.default)('touch');
var ComposerInput = exports.ComposerInput = function ComposerInput(_ref) {
  var inputRef = _ref.inputRef,
    invisible = _ref.invisible,
    onImageSend = _ref.onImageSend,
    disabled = _ref.disabled,
    showTransliteration = _ref.showTransliteration,
    transliterationConfig = _ref.transliterationConfig,
    value = _ref.value,
    onChange = _ref.onChange,
    cursorPosition = _ref.cursorPosition,
    setCursorPosition = _ref.setCursorPosition,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    pastedImage = _useState2[0],
    setPastedImage = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    suggestions = _useState4[0],
    setSuggestions = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    suggestionClicked = _useState6[0],
    setSuggestionClicked = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    activeSuggestion = _useState8[0],
    setActiveSuggestion = _useState8[1];
  var handlePaste = (0, _react.useCallback)(function (e) {
    (0, _parseDataTransfer.default)(e, setPastedImage);
  }, []);
  var handleImageCancel = (0, _react.useCallback)(function () {
    setPastedImage(null);
  }, []);
  var handleImageSend = (0, _react.useCallback)(function () {
    if (onImageSend && pastedImage) {
      Promise.resolve(onImageSend(pastedImage)).then(function () {
        setPastedImage(null);
      });
    }
  }, [onImageSend, pastedImage]);
  (0, _react.useEffect)(function () {
    if (canTouch && inputRef.current) {
      var $composer = document.querySelector('.Composer');
      (0, _riseInput.default)(inputRef.current, $composer);
    }
  }, [inputRef]);
  (0, _react.useEffect)(function () {
    if (value &&
    //@ts-ignore
    value.length > 0 && showTransliteration && transliterationConfig) {
      if (suggestionClicked) {
        setSuggestionClicked(false);
        return;
      }
      setSuggestions([]);

      //@ts-ignore
      var words = value.split(' ');
      var wordUnderCursor = words.find(function (word) {
        return (
          //@ts-ignore
          cursorPosition >= value.indexOf(word) &&
          //@ts-ignore
          cursorPosition <= value.indexOf(word) + word.length
        );
      });
      if (!wordUnderCursor) return;
      fetch(transliterationConfig.transliterationApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "inputLanguage": transliterationConfig.transliterationInputLanguage,
          "outputLanguage": transliterationConfig.transliterationOutputLanguage,
          "input": wordUnderCursor,
          "provider": (transliterationConfig === null || transliterationConfig === void 0 ? void 0 : transliterationConfig.transliterationProvider) || "bhashini",
          "numSuggestions": (transliterationConfig === null || transliterationConfig === void 0 ? void 0 : transliterationConfig.transliterationSuggestions) || 3
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        setSuggestions(data === null || data === void 0 ? void 0 : data.suggestions);
      }).catch(function (error) {
        console.error('Error fetching transliteration:', error);
      });
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cursorPosition]);
  var suggestionClickHandler = (0, _react.useCallback)(function (e) {
    //@ts-ignore
    var words = value.split(' ');

    // Find the word at the cursor position
    var selectedWord = words.find(function (word) {
      return (
        //@ts-ignore
        cursorPosition >= value.indexOf(word) &&
        //@ts-ignore
        cursorPosition <= value.indexOf(word) + word.length
      );
    });
    if (selectedWord) {
      // Replace the selected word with the transliterated suggestion
      //@ts-ignore
      var newInputMsg = value.replace(selectedWord,
      //@ts-ignore
      cursorPosition === value.length ? e + ' ' : e);
      setSuggestions([]);
      setSuggestionClicked(true);
      setActiveSuggestion(0);

      // Save and restore the cursor position
      var restoredCursorPosition =
      //@ts-ignore
      cursorPosition - value.indexOf(selectedWord) + value.indexOf(e);
      //@ts-ignore
      onChange(newInputMsg, e);
      setCursorPosition(restoredCursorPosition);
      //@ts-ignore
      inputRef.current && inputRef.current.focus();
    }
  }, [value, cursorPosition, onChange]);

  // @ts-ignore
  var suggestionHandler = function suggestionHandler(e, index) {
    setActiveSuggestion(index);
  };
  var handleKeyDown = (0, _react.useCallback)(function (e) {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(function (prevActiveSuggestion) {
          return prevActiveSuggestion > 0 ? prevActiveSuggestion - 1 : prevActiveSuggestion;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(function (prevActiveSuggestion) {
          return prevActiveSuggestion < suggestions.length - 1 ? prevActiveSuggestion + 1 : prevActiveSuggestion;
        });
      } else if (e.key === ' ') {
        e.preventDefault();
        if (activeSuggestion >= 0 && activeSuggestion < (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length)) {
          suggestionClickHandler(suggestions[activeSuggestion]);
          setSuggestions([]);
        } else {
          //@ts-ignore
          onChange(prevInputMsg + ' ');
        }
      }
    }
  }, [activeSuggestion, suggestionClickHandler, suggestions]);
  (0, _react.useEffect)(function () {
    if (suggestions.length === 1) {
      setSuggestions([]);
    }
  }, [suggestions]);
  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)({
      'S--invisible': invisible
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'suggestions'
  }, suggestions.map(function (elem, index) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      onClick: function onClick() {
        return suggestionClickHandler(elem);
      },
      className: "suggestion ".concat(activeSuggestion === index ? 'active' : ''),
      onMouseEnter: function onMouseEnter(e) {
        return suggestionHandler(e, index);
      }
    }, elem);
  })), /*#__PURE__*/_react.default.createElement(_Input.Input, (0, _extends2.default)({
    className: "Composer-input",
    rows: 1,
    autoSize: true,
    enterKeyHint: "send",
    onPaste: onImageSend ? handlePaste : undefined,
    ref: inputRef,
    disabled: disabled,
    value: value,
    onChange: onChange
  }, rest)), pastedImage && /*#__PURE__*/_react.default.createElement(_SendConfirm.SendConfirm, {
    file: pastedImage,
    onCancel: handleImageCancel,
    onSend: handleImageSend
  }));
};