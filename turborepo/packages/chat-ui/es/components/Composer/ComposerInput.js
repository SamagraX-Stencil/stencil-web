import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["inputRef", "invisible", "onImageSend", "disabled", "showTransliteration", "transliterationConfig", "value", "onChange", "cursorPosition", "setCursorPosition"];
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Input } from '../Input';
import { SendConfirm } from '../SendConfirm';
import riseInput from './riseInput';
import parseDataTransfer from '../../utils/parseDataTransfer';
import canUse from '../../utils/canUse';
var canTouch = canUse('touch');
export var ComposerInput = function ComposerInput(_ref) {
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
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    pastedImage = _useState2[0],
    setPastedImage = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    suggestions = _useState4[0],
    setSuggestions = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    suggestionClicked = _useState6[0],
    setSuggestionClicked = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    activeSuggestion = _useState8[0],
    setActiveSuggestion = _useState8[1];
  var handlePaste = useCallback(function (e) {
    parseDataTransfer(e, setPastedImage);
  }, []);
  var handleImageCancel = useCallback(function () {
    setPastedImage(null);
  }, []);
  var handleImageSend = useCallback(function () {
    if (onImageSend && pastedImage) {
      Promise.resolve(onImageSend(pastedImage)).then(function () {
        setPastedImage(null);
      });
    }
  }, [onImageSend, pastedImage]);
  useEffect(function () {
    if (canTouch && inputRef.current) {
      var $composer = document.querySelector('.Composer');
      riseInput(inputRef.current, $composer);
    }
  }, [inputRef]);
  useEffect(function () {
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
  var suggestionClickHandler = useCallback(function (e) {
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
  var handleKeyDown = useCallback(function (e) {
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
  useEffect(function () {
    if (suggestions.length === 1) {
      setSuggestions([]);
    }
  }, [suggestions]);
  useEffect(function () {
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx({
      'S--invisible': invisible
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: 'suggestions'
  }, suggestions.map(function (elem, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      onClick: function onClick() {
        return suggestionClickHandler(elem);
      },
      className: "suggestion ".concat(activeSuggestion === index ? 'active' : ''),
      onMouseEnter: function onMouseEnter(e) {
        return suggestionHandler(e, index);
      }
    }, elem);
  })), /*#__PURE__*/React.createElement(Input, _extends({
    className: "Composer-input",
    rows: 1,
    autoSize: true,
    enterKeyHint: "send",
    onPaste: onImageSend ? handlePaste : undefined,
    ref: inputRef,
    disabled: disabled,
    value: value,
    onChange: onChange
  }, rest)), pastedImage && /*#__PURE__*/React.createElement(SendConfirm, {
    file: pastedImage,
    onCancel: handleImageCancel,
    onSend: handleImageSend
  }));
};