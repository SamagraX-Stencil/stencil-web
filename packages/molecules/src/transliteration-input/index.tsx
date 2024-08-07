import { useTransliteration } from '@samagra-x/stencil-hooks';
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import { CSSProperties } from 'react';

const styles: {
  container: CSSProperties;
  suggestions: CSSProperties;
  suggestion: CSSProperties;
  active: CSSProperties;
} = {
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestions: {
    position: 'absolute',
    zIndex: 1000,
    display: 'flex',
    minWidth: '50px',
    width: 'auto',
    top: '-30px',
    left: '10px',
    backgroundColor: 'white',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  },
  suggestion: {
    padding: '0 10px',
    cursor: 'pointer',
  },
  active: {
    backgroundColor: '#65c3d7',
    color: 'white',
  },
};
export interface TransliterationConfigType {
  allowFeedback: boolean;
  allowTextToSpeech: boolean;
  transliterationApi: string;
  allowTransliteration: boolean;
  transliterationProvider: string;
  transliterationSuggestions: string;
  transliterationInputLanguage: string;
  transliterationOutputLanguage: string;
}

export interface TransliterationInputPropsType
  extends Omit<TextareaAutosizeProps, 'value' | 'onChange'> {
  config: TransliterationConfigType;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
  value: string;
  setValue: (value: string) => void;
}

const TransliterationInput: React.FC<TransliterationInputPropsType> = ({
  config,
  placeholder,
  multiline = false,
  rows = 1,
  cols,
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
    <div style={styles.container}>
      <div style={styles.suggestions}>
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

export { TransliterationInput };
