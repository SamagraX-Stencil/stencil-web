import useTransliteration from '../../hooks/useTransliteration';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import styles from './index.module.css';
import { useRef } from 'react';

const TransliterationInput = ({
  config,
  placeholder,
  multiline = false,
  rows = 1,
  cols = 35,
  value,
  setValue,
  ...props
}: any) => {
  const {
    suggestions,
    activeSuggestion,
    handleInputChange,
    suggestionClickHandler,
    suggestionHandler,
  } = useTransliteration(config, value, setValue);

  return (
    <div className={styles.container}>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => suggestionClickHandler(suggestion)}
            className={`${styles.suggestion} ${activeSuggestion === index ? styles.active : ''}`}
            onMouseEnter={() => suggestionHandler(index)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <TextareaAutosize
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        id="inputBox"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={multiline ? rows : 1}
        {...props}
      />
    </div>
  );
};

export default TransliterationInput;
