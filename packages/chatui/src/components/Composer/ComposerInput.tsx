import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Input, InputProps } from '../Input';
import { SendConfirm } from '../SendConfirm';
import riseInput from './riseInput';
import parseDataTransfer from '../../utils/parseDataTransfer';
import canUse from '../../utils/canUse';
import { TransliterationConfig } from '../Chat';

const canTouch = canUse('touch');

interface ComposerInputProps extends InputProps {
  invisible: boolean;
  inputRef: React.MutableRefObject<HTMLTextAreaElement>;
  onImageSend?: (file: File) => Promise<any>;
  showTransliteration: boolean;
  transliterationConfig: TransliterationConfig | null;
  cursorPosition: number;
  setCursorPosition: any;
}

export const ComposerInput = ({
  inputRef,
  invisible,
  onImageSend,
  disabled,
  showTransliteration,
  transliterationConfig,
  value,
  onChange,
  cursorPosition,
  setCursorPosition,
  ...rest
}: ComposerInputProps) => {
  const [pastedImage, setPastedImage] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const handlePaste = useCallback((e: React.ClipboardEvent<any>) => {
    parseDataTransfer(e, setPastedImage);
  }, []);

  const handleImageCancel = useCallback(() => {
    setPastedImage(null);
  }, []);

  const handleImageSend = useCallback(() => {
    if (onImageSend && pastedImage) {
      Promise.resolve(onImageSend(pastedImage)).then(() => {
        setPastedImage(null);
      });
    }
  }, [onImageSend, pastedImage]);

  useEffect(() => {
    if (canTouch && inputRef.current) {
      const $composer = document.querySelector('.Composer');
      riseInput(inputRef.current, $composer);
    }
  }, [inputRef]);

  useEffect(() => {
    if (
      value &&
      //@ts-ignore
      value.length > 0 &&
      showTransliteration && transliterationConfig
    ) {
      if (suggestionClicked) {
        setSuggestionClicked(false);
        return;
      }

      setSuggestions([]);

      //@ts-ignore
      const words = value.split(' ');
      const wordUnderCursor = words.find(
        (word: any) =>
          //@ts-ignore
          cursorPosition >= value.indexOf(word) &&
          //@ts-ignore
          cursorPosition <= value.indexOf(word) + word.length,
      );
      if (!wordUnderCursor) return;
      fetch(transliterationConfig.transliterationApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "inputLanguage": transliterationConfig.transliterationInputLanguage,
          "outputLanguage": transliterationConfig.transliterationOutputLanguage,
          "input": wordUnderCursor,
          "provider": transliterationConfig?.transliterationProvider || "bhashini",
          "numSuggestions": transliterationConfig?.transliterationSuggestions || 3
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data?.suggestions);
        })
        .catch((error) => {
          console.error('Error fetching transliteration:', error);
        });
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, cursorPosition]);

  const suggestionClickHandler = useCallback(
    (e: any) => {
      //@ts-ignore
      const words = value.split(' ');

      // Find the word at the cursor position
      const selectedWord = words.find(
        (word: any) =>
        //@ts-ignore
        cursorPosition >= value.indexOf(word) &&
        //@ts-ignore
          cursorPosition <= value.indexOf(word) + word.length,
      );

      if (selectedWord) {
        // Replace the selected word with the transliterated suggestion
        //@ts-ignore
        const newInputMsg = value.replace(
          selectedWord,
          //@ts-ignore
          cursorPosition === value.length ? e + ' ' : e,
        );

        setSuggestions([]);
        setSuggestionClicked(true);
        setActiveSuggestion(0);

        // Save and restore the cursor position
        const restoredCursorPosition =
          //@ts-ignore
          cursorPosition - value.indexOf(selectedWord) + value.indexOf(e);
        //@ts-ignore
        onChange(newInputMsg, e);
        setCursorPosition(restoredCursorPosition);
        //@ts-ignore
        inputRef.current && inputRef.current.focus();
      }
    },
    [value, cursorPosition, onChange],
  );

  // @ts-ignore
  const suggestionHandler = (e: any, index: number) => {
    setActiveSuggestion(index);
  };

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.keyCode === 229) return;
      if (suggestions.length > 0) {
        if (e.code === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestion((prevActiveSuggestion) =>
            prevActiveSuggestion > 0 ? prevActiveSuggestion - 1 : prevActiveSuggestion,
          );
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestion((prevActiveSuggestion) =>
            prevActiveSuggestion < suggestions.length - 1
              ? prevActiveSuggestion + 1
              : prevActiveSuggestion,
          );
        } else if (e.data === ' ') {
          e.preventDefault && e.preventDefault();
          if (activeSuggestion >= 0 && activeSuggestion < suggestions?.length) {
            suggestionClickHandler(suggestions[activeSuggestion]);
            setSuggestions([]);
          } else {
            //@ts-ignore
            onChange(prevInputMsg + ' ');
          }
        }
      }
    },
    [activeSuggestion, suggestionClickHandler, suggestions],
  );

  useEffect(() => {
    if (suggestions.length === 1) {
      setSuggestions([]);
    }
  }, [suggestions]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    let input = document.getElementById('inputBox');
    input?.addEventListener('textInput', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      input?.removeEventListener('textInput', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={clsx({ 'S--invisible': invisible })}>
      <div className={'suggestions'}>
        {suggestions.map((elem, index) => {
          return (
            <div
              key={index}
              onClick={() => suggestionClickHandler(elem)}
              className={`suggestion`}
              style={activeSuggestion === index ? {backgroundColor: '#65c3d7'} : {}}
              onMouseEnter={(e) => suggestionHandler(e, index)}
            >
              {elem}
            </div>
          );
        })}
      </div>
      <Input
        className="Composer-input"
        id="inputBox"
        rows={1}
        autoSize
        enterKeyHint="send"
        onPaste={onImageSend ? handlePaste : undefined}
        ref={inputRef}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {pastedImage && (
        <SendConfirm file={pastedImage} onCancel={handleImageCancel} onSend={handleImageSend} />
      )}
    </div>
  );
};
